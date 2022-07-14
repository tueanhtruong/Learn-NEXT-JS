import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Ref, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Fade, SlideshowRef } from 'react-slideshow-image';
import { IMAGES } from '../../app-config/images';
import { Grid, LoadingCommon, View } from '../../components/commons';
import { AdminAccounts, BannerConfig, ConfigurationSidebar } from '../../components/configuration';
import { ItemSidebar } from '../../components/configuration/Sidebar';
import LayoutFull from '../../layout/LayoutFull';
import LayoutWithSidebar from '../../layout/LayoutWithSidebar';
import { IRootState } from '../../redux/rootReducer';

const enum SidebarTab {
  ADMIN = 'ADMIN',
  BANNER = 'BANNER',
}

const items: ItemSidebar[] = [
  {
    label: 'Admin Accounts',
    tab: SidebarTab.ADMIN,
  },
  {
    label: 'Banner',
    tab: SidebarTab.BANNER,
  },
];

const Configuration: NextPage<Props> = ({ user, loading }) => {
  const router = useRouter();
  const bannerRef = useRef<SlideshowRef>();
  const SidebarItems = [
    <AdminAccounts key={`sidebar-item-${SidebarTab.ADMIN}`} />,
    <BannerConfig key={`sidebar-item-${SidebarTab.BANNER}`} />,
    <View
      key={`sidebar-item-${SidebarTab.BANNER}-placeholder`}
      className="py-32"
      justify="center"
      align="center"
    >
      <LoadingCommon />
    </View>,
  ];

  const {
    query: { tab = SidebarTab.ADMIN },
  } = router;
  const setTab = (tab: string) => {
    router.push({
      query: { tab },
    });
  };

  // const defaultIndex = tab === SidebarTab.ADMIN ? 0 : 1;
  const handleSetTab = (idx: number) => setTimeout(() => bannerRef.current?.goTo(idx), 200);

  useEffect(() => {
    if (tab === SidebarTab.ADMIN) handleSetTab(0);
    if (tab === SidebarTab.BANNER) handleSetTab(1);
  }, [tab]);

  return (
    <View className="p-configuration container">
      <h1 className="mb-24">Configuration</h1>
      <Grid.Wrap>
        <Grid.Item variant="is-one-quarter">
          <ConfigurationSidebar items={items} tab={tab.toString()} setTab={setTab} />
        </Grid.Item>
        <Grid.Item variant="is-three-quarters" style={{ maxWidth: '98vw' }}>
          <Fade
            arrows={false}
            pauseOnHover={true}
            ref={bannerRef as Ref<SlideshowRef>}
            autoplay={false}
            transitionDuration={400}
            defaultIndex={2}
            cssClass={'p-configuration__slide'}
          >
            {SidebarItems.map((item, index) => (
              <View className="each-fade" key={index}>
                {item}
              </View>
            ))}
          </Fade>
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

const mapDispatchToProps = (dispatch: (arg0: { payload: any; type: string }) => any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Configuration);
