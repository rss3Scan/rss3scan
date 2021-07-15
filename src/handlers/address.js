/* eslint-disable */
// lint later....
import { asyncForEach } from "./common";
import { fetchProfiles, profileList } from './profile';
import { rh } from './request';

let addressItemList = {}
/**
 * fetch address's items (with cache)
 * address {*} address
 **/
export async function fetchAddress(address, page = 1, retry_time = 0) {
  if (retry_time > 4) {
    return false;
  }
  // fill variable
  let itemNumber = null;
  let realAddress = address.split("-")[0]
  let realPage = page;
  // cache
  if (!addressItemList[realAddress]) {
    addressItemList[realAddress] = {};
  }
  // split real page && itemNumber
  if (typeof page == 'string' && page.includes('-')) {
    let d = page.split('-');
    page = parseInt(d[0]);
    itemNumber = parseInt(d[1]);
  }
  // hit item cache
  if (itemNumber > 0 && addressItemList[realAddress][itemNumber]) {
    return addressItemList[realAddress][itemNumber];
  }
  try {
    if (page >= 2) {
      address = `${realAddress}-items-${page - 2}`;
    }
    let data = (await rh.get(address)).data;
    // return with code => error
    if (data.code) {
      return data.code;
    }
    let items = [];
    let nextPageFlag = itemNumber > 0;
    if (data.profile && !profileList[data.id]) {
      profileList[data.id] = {
        id: data.id,
        ...data.profile
      }
    }
    await asyncForEach(data.items, async (d) => {
      d.number = d.id.split("-")[2];
      if (parseInt(d.number) == itemNumber) {
        nextPageFlag = false;
      }
      d.authors = await fetchProfiles(d.authors);
      addressItemList[realAddress][d.number] = d;
      items.push(d);
    })
    if (itemNumber) {
      if (nextPageFlag) {
        await fetchAddress(realAddress, `${page + 1}-${itemNumber}`);
      } else {
        return addressItemList[realAddress][itemNumber]
      }
    }
    data.items = items;
    return data;
  } catch (error) {
    console.error(error);
    if(error.responsed.status == '400'){
      return false
    }
    return await fetchAddress(realAddress, realPage, retry_time + 1);
  }
}

export async function fetchItem(address, itemNumber) {
  await fetchAddress(address, '1-' + itemNumber);
  return addressItemList[address][itemNumber];
}