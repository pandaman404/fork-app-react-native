import { useNavigation } from '@react-navigation/native';
import { Address } from 'fork-business-library';
import { useEffect, useState } from 'react';

const useHandleAddress = (addresses: Address[]) => {
  const { navigate } = useNavigation<any>();
  const [showCustomAlert, setShowCustomAlert] = useState(false);
  const [customAlertMsg, setCustomAlertMsg] = useState('');
  const [customAlertCode, setCustomAlertCode] = useState('');

  const [profileAddresses, setProfileAddresses] = useState(
    addresses.map((address) => {
      return { ...address, showOptions: false };
    })
  );

  const createProfileAddresses = () => {
    setProfileAddresses(
      addresses.map((address) => {
        return { ...address, showOptions: false };
      })
    );
  };

  const { enabledAddresses, disabledAddresses } = profileAddresses.reduce(
    (acc: any, curr: any) => {
      if (curr.isDeliveryAvailable) {
        acc.enabledAddresses = [...acc.enabledAddresses, curr];
      } else {
        acc.disabledAddresses = [...acc.disabledAddresses, curr];
      }
      return acc;
    },
    { enabledAddresses: [] as any[], disabledAddresses: [] as any[] }
  );

  const showAddressOptions = (id: number | null) => {
    const showOptionsUpdated = profileAddresses.map((item) => {
      if (item.id === id) {
        if (item.showOptions) {
          item.showOptions = false;
        } else item.showOptions = true;
      } else {
        item.showOptions = false;
      }
      return item;
    });
    setProfileAddresses(showOptionsUpdated);
  };

  const openEditAddress = (id: any) => {
    navigate("AddEditAddressScreen", {
      addressId: id,
    });
  };

  const handleCustomAlert = (msg: any, code: any) => {
    setShowCustomAlert(true)
    setCustomAlertMsg(msg)
    setCustomAlertCode(code)

    setTimeout(() => {
      setShowCustomAlert(false)
    }, 3000);
  }

  useEffect(() => {
    createProfileAddresses()
  }, [addresses])


  return {
    openEditAddress,
    enabledAddresses,
    disabledAddresses,
    showAddressOptions,
    handleCustomAlert,
    showCustomAlert,
    customAlertMsg,
    customAlertCode
  };
}

export default useHandleAddress