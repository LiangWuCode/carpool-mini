export type resultType = {
  records: any;
  pages: string | number;
  size: string | number;
  total: string | number;
  [k: string]: any;
};

export type responseDataType = {
  code: number;
  message: string;
  result: resultType;
};

export type responseType = {
  statusCode: Number;
  data: responseDataType;
};

export type apiType = (...param: any) => Promise<responseDataType>;
