// components/Icon.tsx
import {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
} from '@expo/vector-icons';

// type Pack = 'ionicon' | 'material' | 'material-community' | 'feather' | 'antdesign' | 'entypo';

const packs: Record<any, any> = {
  antdesign: AntDesign,
  entypo: Entypo,
  evilicon: EvilIcons,
  feather: Feather,
  'font-awesome': FontAwesome,
  'font-awesome-5': FontAwesome5,
  fontisto: Fontisto,
  foundation: Foundation,
  ionicon: Ionicons,
  material: MaterialIcons,
  'material-community': MaterialCommunityIcons,
  octicon: Octicons,
  'simple-line-icon': SimpleLineIcons,
  zocial: Zocial,
};

type Props = {
  type?: any;
  name: string;
  size?: number;
  color?: string;
} & Omit<React.ComponentProps<typeof Ionicons>, 'name' | 'size' | 'color'>;

export function Icon({ type = 'ionicon', name, size = 24, color = '#000', ...rest }: Props) {
  const PackComp = packs[type];
  return <PackComp name={name as any} size={size} color={color} {...rest} />;
}
