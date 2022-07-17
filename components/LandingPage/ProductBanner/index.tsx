import type { NextPage } from 'next';
import { connect } from 'react-redux';
import { useComponentDidMount } from '../../../hooks';
import { getConfigurationBannersAction } from '../../../redux/configuration/configurationSlice';
import { IRootState } from '../../../redux/rootReducer';
import { TableParams } from '../../../redux/type';
import { isEmpty } from '../../../validations';
import { FileRenderer, LoadingCommon, Text, View } from '../../commons';

const ProductBanner: NextPage<Props> = ({ user, loading, banners, onGetConfigurationBanners }) => {
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

  return (
    <View className="cmp-pro-banner" isRow justify="space-between" align="center">
      {showBanners.map((banner, idx) => {
        return (
          <View className="cmp-pro-banner__item" key={`product-banner-${idx}`}>
            <FileRenderer
              url={banner.image}
              imgHeight={324}
              imgWidth={324}
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
});

const mapDispatchToProps = (dispatch: (arg0: { payload: any; type: string }) => any) => ({
  onGetConfigurationBanners: (payload: TableParams) =>
    dispatch(getConfigurationBannersAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductBanner);
