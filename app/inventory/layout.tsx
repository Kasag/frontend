'use client'

import {
  createTheme,
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ThemeProvider,
  Toolbar,
  Typography
} from '@mui/material'
import { Logout as LogoutIcon, Menu as MenuIcon } from '@mui/icons-material'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

// モバイルとPCの２つに限定
declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: false
    sm: false
    md: false
    lg: false
    xl: false
    mobile: true
    desktop: true
  }
}

const defaultTheme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      desktop: 600
    }
  }
})

// 引数はchildrenプロパティをもつオブジェクト
// childrenプロパティはReactNode型の値をもつ。
export default function InventoryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // サイドバーの開閉を管理する。
  const [ open, setOpen ] = useState(false)
  const toggleDrawer = (open: boolean) => {
    setOpen(open)
  }

  // 各種画面への繊維を管理する。
  const router = useRouter()

  // ログアウト処理
  const handleLogout = () => {
    router.replace("/login")
  }

  /**
   * 開閉対象のサイドバーコンポーネント
   */
  const sideBar = () => (
    <>
      <Box sx={{ width: 240 }}>
        <Toolbar />
        <Divider />
        <List>
          <ListItem component="a" href="/inventory/products" disablePadding>
            <ListItemButton>
              <ListItemText primary="商品一覧" />
            </ListItemButton>
          </ListItem>
          <Divider />

          <ListItem component="a" href="/inventory/import_sales" disablePadding>
            <ListItemButton>
              <ListItemText primary="売上一括登録" />
            </ListItemButton>
          </ListItem>
          <Divider />
        </List>
      </Box>
    </>
  )

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: "flex" }}>
          {/* ヘッダー */}
          <AppBar position="fixed">
            <Toolbar>
              <IconButton onClick={ () => toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>

              <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1}}
              >
                在庫管理システム
              </Typography>

              <Button
                variant="contained"
                startIcon={<LogoutIcon />}
                onAbort={() => handleLogout()}
              >
                ログアウト
              </Button>
            </Toolbar>
          </AppBar>

          {/* サイドバー */}
          <Drawer open={open} onClose={() => toggleDrawer(false)} anchor="left">
            {sideBar()}
          </Drawer>

          {/* メインコンテンツ */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              // AppBarの高さ分だけ下にずらす
              marginTop: "64px",
              width: "100%",
              background: "white"
            }}
          >
            { children }
          </Box>

          {/* フッター */}
          <Box
            component="footer"
            sx={{
              width: "100%",
              position: "fixed",
              textAlign: "center",
              bottom: 0,
              background: "#1976d2"
            }}
          >
            <Typography variant="caption" color="white">
              &copy; 2023 full stack web development
            </Typography>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  )
}