import React, { useState, useEffect } from "react";
import SEO from "@/components/seo";
import Wrapper from '@/layout/wrapper';
import HeaderTwo from "@/layout/headers/header-2";
import CloudinaryImageManager from "@/components/a/ImageUploadPage";
import Footer from '@/layout/footers/footer-2';

const SomePage = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Ensure component only renders after mounting on client side
  }, []);

  return (
    <>
     <Wrapper>
          <SEO pageTitle="Image Upload" />
          <HeaderTwo style_2={true} />
          {isMounted && <CloudinaryImageManager />}
          <Footer primary_style={true} />
      </Wrapper>
 
    </>
  );
};

export default SomePage;
