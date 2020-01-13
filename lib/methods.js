import { gapi } from "gapi-script";
import * as constants from "./type-constants";

/**
 * * Call real Youtube API using specific type, action, parameters
 * @typeof {Object}
 * @param {String} type type of service
 * @param {String} action action of specific service
 * @param {Object} params parameters passing to real Youtube API call
 * @return {Object} result of response
 */
const callYoutubeAPI = async ({ type, action, params }) => {
  try {
    const response = await gapi.client.youtube[type][action](params);
    return response.result;
  } catch (e) {
    throw new Error(e.result.error.message);
  }
};

const methods = new Array(Object.entries(constants).length)
  .fill()
  .map(() => ({}));

// List up all the actions per services
export const typeToActions = {
  [constants.ACTIVITIES]: ["list", "insert"],
  [constants.CAPTIONS]: ["list", "insert", "update", "download", "delete"],
  [constants.CHANNEL_BANNERS]: ["insert"],
  [constants.CHANNELS]: ["list", "update"],
  [constants.CHANNEL_SECTIONS]: ["list", "insert", "update", "delete"],
  [constants.COMMENTS]: [
    "list",
    "insert",
    "update",
    "markAsSpam",
    "setModerationStatus",
    "delete"
  ],
  [constants.COMMENT_THREADS]: ["list", "insert", "update"],
  [constants.GUIDE_CATEGORIES]: ["list"],
  [constants.I18N_LANGUAGES]: ["list"],
  [constants.I18N_REGIONS]: ["list"],
  [constants.PLAYLIST_ITEMS]: ["list", "insert", "update", "delete"],
  [constants.PLAYLISTS]: ["list", "insert", "update", "delete"],
  [constants.SEARCH]: ["list"],
  [constants.SUBSCRIPTIONS]: ["list", "insert", "delete"],
  [constants.THUMBNAILS]: ["set"],
  [constants.VIDEO_ABUSE_REPORT_REASONS]: ["list"],
  [constants.VIDEO_CATEGORIES]: ["list"],
  [constants.VIDEOS]: [
    "list",
    "insert",
    "update",
    "rate",
    "getRating",
    "reportAbuse",
    "delete"
  ],
  [constants.WATERMARKS]: ["set", "unset"]
};

// TODO: type, actions 테스트
Object.keys(typeToActions).forEach((type, index) => {
  typeToActions[type].forEach(action => {
    Object.assign(methods[index], {
      [action]: async params => {
        const result = await callYoutubeAPI({
          type,
          action,
          params
        });
        return result;
      }
    });
  });
});

export default methods;
