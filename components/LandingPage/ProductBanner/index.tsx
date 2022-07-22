import type { NextPage } from 'next';
import { connect } from 'react-redux';
import { useComponentDidMount } from '../../../hooks';
import { getConfigurationBannersAction } from '../../../redux/configuration/configurationSlice';
import { IRootState } from '../../../redux/rootReducer';
import { TableParams } from '../../../redux/type';
import { isEmpty } from '../../../validations';
import { FileRenderer, LoadingCommon, Text, View } from '../../commons';

const getBannerWidth = (width: number): number => {
  if (!width) return 324;
  const isMobile = width < 768;
  const isDesktop = width < 1215;
  if (isMobile) return (width * 0.95) / 1.2;
  if (isDesktop) return (width * 0.95) / 2.4;
  return (width * 0.95) / 4.4;
};

const ProductBanner: NextPage<Props> = ({
  screenWidth,
  loading,
  banners,
  onGetConfigurationBanners,
}) => {
  useComponentDidMount(() => {
    if (isEmpty(banners)) onGetConfigurationBanners({ order: 'asc', sort: 'order' });
  });

  if (isEmpty(banners) || loading) {
    return (
      <View className="cmp-pro-banner py-32" isRow justify="space-between">
        <LoadingCommon />
      </View>
    );
  }

  const showBanners = banners.slice(0, 4);
  const width = getBannerWidth(screenWidth);

  return (
    <View className="cmp-pro-banner" isRow justify="center" align="center">
      {showBanners.map((banner, idx) => {
        return (
          <View className="cmp-pro-banner__item" key={`product-banner-${idx}`}>
            <FileRenderer
              url={banner.image}
              imgHeight={width}
              imgWidth={width}
              imageClassName="cmp-pro-banner__item__image"
            />
            <Text size={32} className="cmp-pro-banner__item__label">
              {banner.label}
            </Text>
            <Text className="cmp-pro-banner__item__description">{banner.description}</Text>
          </View>
        );
      })}
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
const mapStateToProps = (state: IRootState) => ({
  loading: state.configuration.loading,
  user: state.auth.authUser,
  banners: state.configuration.banners,
  screenWidth: state.content.screenWidth,
});

const mapDispatchToProps = (dispatch: (_arg0: { payload: any; type: string }) => any) => ({
  onGetConfigurationBanners: (payload: TableParams) =>
    dispatch(getConfigurationBannersAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductBanner);
