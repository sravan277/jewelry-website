import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import HeaderFour from '@/layout/headers/header-4';
import JewelryBanner from '@/components/banner/jewelry-banner';
import JewelryShopBanner from '@/components/shop-banner/jewelry-shop-banner';
import JewelryAbout from '@/components/about/jewelry-about';
import FeatureAreaThree from '@/components/features/feature-area-3';
import FooterTwo from '@/layout/footers/footer-2';
import ImageColorizer from "@/components/ImageColorizer";

export default function Home() {
  return (
    <Wrapper>
      <SEO pageTitle='Home'/>
      <HeaderFour/>
      <JewelryBanner/>
      <FeatureAreaThree />
      <JewelryShopBanner/>
      <JewelryAbout/>
      <ImageColorizer/>
      <FooterTwo/>
    </Wrapper>
  )
}
