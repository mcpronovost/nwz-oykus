import slugify from "slugify";

export const oykSlugify = (string) => {
  return slugify(string, { lower: true });
};
