import React from "react";
import SEO from "@/components/seo";
import HeaderTwo from "@/layout/headers/header-2";
import ImageUploadPage from "@/components/a/ImageUploadPage";

const SomePage = () => {
  return (
    <>
      <SEO pageTitle="Image Upload" />
      <HeaderTwo style_2={true} />
      <ImageUploadPage />
    </>
  );
};

export default SomePage;