import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Layout Imports
// !Do not remove this Layout import
import VerticalLayout from 'src/@core/layouts/VerticalLayout'

// ** Navigation Imports
import VerticalNavItems from 'src/navigation/vertical'

// ** Component Import
// import UpgradeToProButton from './components/UpgradeToProButton'
import VerticalAppBarContent from './components/vertical/AppBarContent'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'

import { useAccount } from 'wagmi'
import blockies from 'blockies'

const UserLayout = ({ children }) => {
  // ** Hooks
  const { settings, saveSettings } = useSettings()

  //user logged in account
  const { address, isConnected } = useAccount()

  /**
   *  The below variable will hide the current layout menu at given screen size.
   *  The menu will be accessible from the Hamburger icon only (Vertical Overlay Menu).
   *  You can change the screen size from which you want to hide the current layout menu.
   *  Please refer useMediaQuery() hook: https://mui.com/components/use-media-query/,
   *  to know more about what values can be passed to this hook.
   *  ! Do not change this value unless you know what you are doing. It can break the template.
   */
  const hidden = useMediaQuery(theme => theme.breakpoints.down('lg'))
  const [icon, setIcon] = useState(null)
  useEffect(() => {
    if (isConnected) {
      const iconUrl = blockies({ seed: address })
      setIcon(iconUrl.toDataURL())
    }
  }, [isConnected])

  return (
    <VerticalLayout
      hidden={hidden}
      settings={settings}
      saveSettings={saveSettings}
      address={address}
      isConnected={isConnected}
      icon={icon}
      verticalNavItems={VerticalNavItems()} // Navigation Items
      //afterVerticalNavMenuContent={UpgradeToProImg}
      verticalAppBarContent={(
        props // AppBar Content
      ) => (
        <VerticalAppBarContent
          hidden={hidden}
          settings={settings}
          saveSettings={saveSettings}
          address={address}
          isConnected={isConnected}
          icon={icon}
          toggleNavVisibility={props.toggleNavVisibility}
        />
      )}
    >
      {children}
      {/* <UpgradeToProButton /> */}
    </VerticalLayout>
  )
}

export default UserLayout
