import React from 'react';
import { Tab } from '@headlessui/react';
import { ProfileAboutTab } from '../../components/profileTabs/ProfileAboutTab';
import { ProfileTabs } from '../../components/profileTabs/ProfileTabs';
import { useGetProfileFromUrl } from '../../custom-hooks/useGetProfileFromUrl';

export const ProfileTabsController: React.FC = () => {
  const { data, loading } = useGetProfileFromUrl();

  let body = null;

  if (loading) {
  } else if (!data?.user.user) {
  } else {
    body = (
      <ProfileTabs
        panels={
          <Tab.Panel className="py-4">
            <ProfileAboutTab
              followers={45}
              following={90}
              bio={data.user.user.bio}
              email={data.user.user.email}
            />
          </Tab.Panel>
        }
      />
    );
  }

  if (data?.user.errors) {
    body = null;
  }

  return <>{body}</>;
};
