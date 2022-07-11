import type { NextPage } from 'next';
import Head from 'next/head';
import { Button, Text, View } from '../components/commons';
import { Fade, SlideshowRef } from 'react-slideshow-image';
import Image from 'next/image';
import { IMAGES } from '../app-config/images';
import { IRootState } from '../redux/rootReducer';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { PATHS } from '../app-config/paths';
import { useRef, useState } from 'react';
import cn from 'classnames';

const fadeImages: {
  urlKey: keyof typeof IMAGES;
  caption: string;
  description: string;
}[] = [
  {
    urlKey: 'banner1',
    caption: 'Lorem Ipsum',
    description: 'Vestibulum semper tortor suscipit velit molestie, in convallis justo porta.',
  },
  {
    urlKey: 'banner2',
    caption: 'Nam auctor',
    description:
      'Nunc quis volutpat dui. Sed pellentesque magna a nunc vulputate, ut condimentum turpis lobortis.',
  },
  {
    urlKey: 'banner3',
    caption: 'Aliquam eget',
    description: 'Curabitur odio libero, rutrum quis volutpat vel, tristique sit amet lacus.',
  },
  {
    urlKey: 'banner4',
    caption: 'Duis sed',
    description: 'Nunc malesuada aliquam quam, eu auctor mi fringilla non.',
  },
];

const Home: NextPage<Props> = ({ isAuthenticated }) => {
  const router = useRouter();
  const [currentSlide, setSlide] = useState<number>(0);
  const bannerRef = useRef<SlideshowRef>(null);
  const handleBannerClick = () => {
    if (isAuthenticated) return router.push(PATHS.shopping);
    return router.push(PATHS.signIn);
  };
  const handleChangeSlide = (_from: number, to: number) => setSlide(to);
  const handleGoSlide = (to: number) => () => {
    if (to !== currentSlide) return bannerRef.current?.goTo(to);
  };
  return (
    <View className="p-landing">
      <Head>
        <title>Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <View className="p-landing__banner">
        <Fade
          arrows={false}
          pauseOnHover={true}
          ref={bannerRef}
          duration={5000}
          transitionDuration={400}
          onChange={handleChangeSlide}
        >
          {fadeImages.map((fadeImage, index) => (
            <View className="each-fade" key={index}>
              <View className="image-container">
                <Image
                  className="p-landing__banner__image"
                  src={IMAGES[fadeImage.urlKey]}
                  alt="Unset"
                  width={1400}
                  height={800}
                />
              </View>
              <View className="p-landing__banner__content">
                <View className="p-landing__banner__content__window">
                  <Text size={48} className="fw-bold">
                    {fadeImage.caption}
                  </Text>
                  <Text size={18}>{fadeImage.description}</Text>
                  <Button
                    variant="secondary-outline"
                    onClick={handleBannerClick}
                    label={isAuthenticated ? 'SHOPPING NOW' : 'LOG IN'}
                  />
                </View>
              </View>
            </View>
          ))}
        </Fade>
        <View className="p-landing__banner__indicator" isRow>
          {fadeImages.map((_, index) => (
            <View
              className={cn('p-landing__banner__indicator__item', {
                'is-active': index === currentSlide,
              })}
              key={`landing__indicator__${index}`}
              onClick={handleGoSlide(index)}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
const mapStateToProps = (state: IRootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch: (arg0: { payload: any; type: string }) => any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
