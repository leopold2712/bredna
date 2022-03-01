export type JwtToken = {
  iat: number;
  isTestAccount: boolean;
  iss: string;
  sourceId: number;
  sourceType: string;
  sub: number;
  type: string;
};
