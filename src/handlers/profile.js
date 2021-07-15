/* eslint-disable */
import { rh } from "./request";
import { asyncForEach } from "./common";


export let profileList = {};
export async function fetchProfile(profileId, retryTime = 0) {
    if (retryTime > 5) {
        return 404;
    }
    if (profileList[profileId]) {
        return profileList[profileId];
    }
    let data = (await rh.get(`https://hub.rss3.io/profile/${profileId}`)).data;
    // return with code => error
    if (data.code) {
        return data.code;
    }
    data.id = profileId;
    profileList[profileId] = data
    return data;
}
export async function fetchProfiles(profileIds) {
    if (typeof profileIds == 'string') {
        profileIds = [profileIds];
    }
    let list = [];
    await asyncForEach(profileIds, async profileId => {
        let d = await fetchProfile(profileId);
        list.push(d);
    })
    return list;
}