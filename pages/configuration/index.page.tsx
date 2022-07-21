import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
// import { Ref, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
// import { Fade, SlideshowRef } from 'react-slideshow-image';
import { PATHS } from '../../app-config/paths';
import { Grid, LoadingCommon, Text, View } from '../../components/commons';
import { AdminAccounts, BannerConfig, ConfigurationSidebar } from '../../components/configuration';
import { ItemSidebar } from '../../components/configuration/Sidebar';
import { IRootState } from '../../redux/rootReducer';
import { motion, AnimatePresence } from 'framer-motion';

const enum _SidebarTab {
  _ADMIN = 'ADMIN',
  _BANNER = 'BANNER',
  _SHOP = 'SHOP',
  _ORDER = 'ORDER',
  _PAYMENT = 'PAYMENT',
  _ANIMATION = 'ANIMATION',
}

const items: ItemSidebar[] = [
  {
    label: 'Account Management',
    tab: _SidebarTab._ADMIN,
  },
  {
    label: 'Banner Configuration',
    tab: _SidebarTab._BANNER,
  },
  {
    label: 'Shop',
    tab: _SidebarTab._SHOP,
  },
  {
    label: 'Animation',
    tab: _SidebarTab._ANIMATION,
  },
];

const SidebarItems = [
  <AdminAccounts key={`sidebar-item-${_SidebarTab._ADMIN}`} />,
  <BannerConfig key={`sidebar-item-${_SidebarTab._BANNER}`} />,
  <View
    key={`sidebar-item-${_SidebarTab._BANNER}-placeholder`}
    className="py-32"
    justify="center"
    align="center"
    flexGrow={1}
  >
    <LoadingCommon />
  </View>,
  <View
    key={`sidebar-item-${_SidebarTab._ANIMATION}-placeholder`}
    className="py-32"
    justify="center"
    align="center"
  >
    <Link href={PATHS.starFall}>
      <a>
        <Text size={20} className="fw-bold">
          Star Fall
        </Text>
      </a>
    </Link>
  </View>,
];

const Configuration: NextPage<Props> = () => {
  const router = useRouter();
  // const bannerRef = useRef<SlideshowRef>();

  const {
    query: { tab = _SidebarTab._ADMIN },
  } = router;
  const setTab = (tab: string) => {
    router.push({
      query: { tab },
    });
  };

  // const defaultIndex = tab === _SidebarTab._ADMIN ? 0 : 1;
  // const handleSetTab = (idx: number) => setTimeout(() => bannerRef.current?.goTo(idx), 200);

  // useEffect(() => {
  //   if (tab === _SidebarTab._ADMIN) handleSetTab(0);
  //   else if (tab === _SidebarTab._BANNER) handleSetTab(1);
  //   else if (tab === _SidebarTab.ANIMATION) handleSetTab(3);
  //   else handleSetTab(2);
  // }, [tab]);

  return (
    <View className="p-configuration container" style={{ width: '100%' }}>
      <h1 className="mb-24">Configuration</h1>
      <Grid.Wrap>
        <Grid.Item variant="is-one-quarter">
          <ConfigurationSidebar items={items} tab={tab.toString()} setTab={setTab} />
        </Grid.Item>
        <Grid.Item variant="is-three-quarters" style={{ maxWidth: '98vw' }}>
          <AnimatePresence exitBeforeEnter>
            <motion.div
              key={tab.toString()}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 10, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {tab === _SidebarTab._ADMIN
                ? SidebarItems[0]
                : tab === _SidebarTab._BANNER
                ? SidebarItems[1]
                : tab === _SidebarTab._ANIMATION
                ? SidebarItems[3]
                : SidebarItems[2]}
            </motion.div>
          </AnimatePresence>
          {/* <Fade
            arrows={false}
            pauseOnHover={true}
            ref={bannerRef as Ref<SlideshowRef>}
            autoplay={false}
            transitionDuration={350}
            defaultIndex={2}
            cssClass={'p-configuration__slide'}
          >
            {SidebarItems.map((item, index) => (
              <View className="each-fade" key={index}>
                {item}
              </View>
            ))}
          </Fade> */}
        </Grid.Item>
      </Grid.Wrap>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
const mapStateToProps = (state: IRootState) => ({
  loading: state.auth.loading,
  user: state.auth.authUser,
});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch: (arg0: { payload: any; type: string }) => any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Configuration);
