import type { NextPage } from 'next';
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { IMAGES } from '../../../app-config/images';
import { Grid, Text, View } from '../../commons';

const footerFollowUs: {
  image: keyof typeof IMAGES;
  name: string;
}[] = [
  {
    image: 'logoUs',
    name: 'Tue Truong',
  },
  { image: 'avatarPlaceholder', name: 'Thi Ton' },
];

const Footer: NextPage<Props> = () => {
  return (
    <View className="p-landing__footer mt-64 py-32" align="center">
      <Grid.Wrap className="secondary-container">
        <Grid.Item variant="is-one-third">
          <Image src={IMAGES.logoCode} width={48} height={48} alt="Unset" />
          <Text size={14} className="fw-bold">
            224 Ton Duc Thang
          </Text>
          <Text size={14} className="fw-bold">
            Tan An, Hoi An, Quang Nam
          </Text>
          <Text size={14} className="fw-bold">
            Viet Nam
          </Text>
          <Text size={14} className="fw-bold mt-24">
            Contact: 0335062007
          </Text>
          <Text size={14} className="fw-bold">
            Email: tueleesin@gmail.com
          </Text>
        </Grid.Item>
        <Grid.Item variant="is-one-third">
          <Text size={28} className="fw-bold">
            OUR CUSTOMERS
          </Text>
          <Text size={14} className="fw-bold mt-8">
            Neque porro
          </Text>
          <Text size={14} className="fw-bold mt-8">
            Quisquam Est Qui
          </Text>
          <Text size={14} className="fw-bold mt-8">
            Consectetur
          </Text>
        </Grid.Item>
        <Grid.Item variant="is-one-third">
          <Text size={28} className="fw-bold">
            ABOUT US
          </Text>
          {footerFollowUs.map((item, idx) => {
            return (
              <View
                isRowWrap
                flexGrow={1}
                key={`follow-us-${idx}`}
                align="center"
                className="mt-16"
              >
                <Image
                  className="p-landing__footer__avatar"
                  alt="Unset"
                  src={IMAGES[item.image]}
                  width={52}
                  height={52}
                />
                <Text className="fw-bold ml-16">{item.name}</Text>
              </View>
            );
          })}
          <View isRow className="mt-16" align="center">
            <Text className="fw-bold mr-16">Follow Us: </Text>
            <FaFacebook size={32} className="mr-16" />
            <FaTwitter size={32} className="mr-16" />
            <FaInstagram size={32} />
          </View>
        </Grid.Item>
      </Grid.Wrap>
    </View>
  );
};

type Props = {};

export default Footer;
