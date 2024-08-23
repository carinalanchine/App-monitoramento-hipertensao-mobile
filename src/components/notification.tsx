import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { fontSize } from '../theme/font-size';
import { fontFamily } from '../theme/font-family';

type NotificationProps = {
  icon: ReactNode;
  title: string;
  description: string;
}

const Notification = ({ description, icon, title }: NotificationProps) => {
  return (
    <View style={style.container}>
      <View style={style.icon}>
        {icon}
      </View>

      <View>
        <Text style={style.title}>{title}</Text>
        <Text style={style.description}>{description}</Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 40,
    backgroundColor: colors.tertiary,
    minHeight: 100,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 20,
  },
  icon: {
    width: 70,
    height: 70,
    borderRadius: 80,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.medium,
  },
  description: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
  }
});

export default Notification;