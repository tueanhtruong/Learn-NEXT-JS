import type { NextPage } from 'next';
import { Grid, Text, View } from '../../components/commons';
import Image from 'next/image';
import { IMAGES } from '../../app-config/images';
import { IRootState } from '../../redux/rootReducer';
import { connect } from 'react-redux';
import Footer from '../../components/LandingPage/Footer';
import { ConfigurationSidebar } from '../../components/configuration';
import { ItemSidebar } from '../../components/configuration/Sidebar';
import { AnimatePresence, motion } from 'framer-motion';
import Shop from '../../components/shopping/Shop';
import { useState } from 'react';
import { BsShopWindow, BsCart2 } from 'react-icons/bs';

const fadeImage: {
  urlKey: keyof typeof IMAGES;
  caption: string;
  description: string;
} = {
  urlKey: 'shopBanner',
  caption: 'Duis sed',
  description: 'Nunc malesuada aliquam quam, eu auctor mi fringilla non.',
};

const enum _SidebarTab {
  _SHOP = 'SHOP',
  _ORDER = 'ORDER',
}

const items: ItemSidebar[] = [
  {
    label: 'Shop',
    tab: _SidebarTab._SHOP,
    icon: <BsShopWindow size={24} className="mr-16" />,
  },
  {
    label: 'My Order',
    tab: _SidebarTab._ORDER,
    icon: <BsCart2 size={24} className="mr-16" />,
  },
];

const Shopping: NextPage<Props> = ({ loading }) => {
  const [tab, setTab] = useState(_SidebarTab._SHOP);

  // const router = useRouter();
  // const {
  //   query: { tab = _SidebarTab._SHOP },
  // } = router;
  // const setTab = (tab: string) => {
  //   router.push({
  //     query: { tab },
  //   });
  // };

  return (
    <View className="p-landing">
      <View className="p-landing__banner">
        <View className="p-landing__banner__image-container">
          <Image
            className="p-landing__banner__image"
            src={IMAGES[fadeImage.urlKey]}
            alt="Unset"
            width={1400}
            height={600}
          />
        </View>
        <View className="p-landing__banner__content">
          <View className="p-landing__banner__content__window">
            <Text size={64} className="fw-bold">
              {fadeImage.caption}
            </Text>
            <Text size={24}>{fadeImage.description}</Text>
          </View>
        </View>
      </View>
      <View className="py-64 container" flexGrow={1} style={{ width: '100%' }}>
        <Grid.Wrap>
          <Grid.Item variant="is-one-quarter" style={{ marginTop: 64 }}>
            <ConfigurationSidebar items={items} tab={tab.toString()} setTab={setTab} />
          </Grid.Item>
          <Grid.Item variant="is-three-quarters">
            <AnimatePresence exitBeforeEnter>
              <motion.div
                key={tab.toString()}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 10, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {tab === _SidebarTab._SHOP ? <Shop /> : null}
              </motion.div>
            </AnimatePresence>
          </Grid.Item>
        </Grid.Wrap>
      </View>
      <Footer />
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
const mapStateToProps = (state: IRootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.shop.loading,
  user: state.auth.authUser,
  items: state.shop.items,
});

const mapDispatchToProps = (dispatch: (_arg0: { payload: any; type: string }) => any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Shopping);
