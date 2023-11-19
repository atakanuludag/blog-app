"use client";

import service from "@/services";
import ArticleModel, {
  ArticleFormModel,
  ArticleListQueryModel,
} from "@/models/ArticleModel";
import ListResponseModel from "@/models/ListResponseModel";
import { EndpointUrls } from "@/config";
import { objectToParams } from "@/utils/params";

const ArticleService = {
  getItems: async (
    params?: ArticleListQueryModel
  ): Promise<ListResponseModel<ArticleModel[]> | ArticleModel[]> =>
    service(`${EndpointUrls.article}${objectToParams(params)}`),
  postItem: async (body: ArticleFormModel): Promise<void> =>
    service(`${EndpointUrls.article}`, {
      method: "POST",
      body,
    }),
  patchItem: async (body: ArticleFormModel): Promise<void> =>
    service(`${EndpointUrls.article}/${body._id}`, {
      method: "PATCH",
      body,
    }),
  getItemByGuid: async (guid: string): Promise<ArticleModel> =>
    service(`${EndpointUrls.article}/getByGuid/${guid}`),
  getItemById: async (id: string): Promise<ArticleModel> =>
    service(`${EndpointUrls.article}/getById/${id}`),
  // getLikeIPCheck: async (guid: string, ip: string): Promise<boolean> => {
  //   try {
  //     const res = await axios.get(`/article/likeIpCheck/${guid}`, {
  //       params: {
  //         ip,
  //       },
  //     });
  //     return typeof res.data !== "undefined" ? res.data : true;
  //   } catch (err) {
  //     console.log("[ArticleService] getLikeIPCheck() Error: ", err);
  //     return true;
  //   }
  // },
  likePost: async (id: string): Promise<number> =>
    service(`${EndpointUrls.article}/like/${id}`, {
      method: "POST",
    }).then((res) => {
      return typeof res.data !== "undefined" ? res.data : 0;
    }),
  deleteItem: async (id: string): Promise<void> =>
    service(`${EndpointUrls.article}/${id}`, {
      method: "DELETE",
    }),
  guidExists: async (guid: string): Promise<boolean> =>
    service(`${EndpointUrls.article}/guidExists/${guid}`, {
      method: "DELETE",
    }).then((res) => res.data.exists),
};

Object.freeze(ArticleService);

export default ArticleService;
