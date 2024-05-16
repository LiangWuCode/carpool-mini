export type resultType = {
  pageNum?: string | number;
  pageSize?: string | number;
  total?: string | number;
  [k: string]: any;
};

export type responseDataType = {
  code: number;
  message: string;
  data: resultType;
};

export type responseType = {
  statusCode: Number;
  data: responseDataType;
};

export type apiType = (...param: any) => Promise<responseDataType>;
