import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { UserProfile } from './UserProfile';
import { images } from '../../utils/Images';

export function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <UserProfile imageSource={images.profile} firstName="John" lastName="Doe" />
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    );
  }