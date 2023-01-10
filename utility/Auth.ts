import { resolvePlugin } from '@babel/core';
import { ThemeConsumer } from '@rneui/themed';
import { getToken } from './Token';

export const isAuth = async () => {
  const permissions = await getToken('permissions');
  if (!permissions) {
    return false;
  }
  return (
    permissions === 'follower' ||
    permissions === 'admin' ||
    permissions === 'leader'
  );
};
