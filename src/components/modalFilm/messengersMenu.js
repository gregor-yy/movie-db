import React from 'react'
import './Modal.css'
import { Menu, MenuButton, MenuList, MenuItem, Button, IconButton } from "@chakra-ui/react"
import { FaFacebook, FaTwitter, FaVk, FaWhatsapp, FaInstagram, FaTelegramPlane, FaEllipsisV } from 'react-icons/fa'

const MenuM = () => {
    return (
        <div className='menu-messegners'>
            <Menu>
                <MenuButton
                    size="lg"
                    borderRadius='30px'
                    as={IconButton}
                    icon={<FaEllipsisV />}
                    backgroundColor='transparent'
                    _hover={{ backgroundColor: '#22254b' }}
                />
                <MenuList backgroundColor='transparent' borderColor="transparent">
                    <MenuItem
                        _hover={{ backgroundColor: 'transparent', cursor: 'default' }}
                        _focus={{ backgroundColor: 'transparent', cursor: 'default' }}>
                        <Button colorScheme="facebook" leftIcon={<FaFacebook />}>
                            Facebook
                        </Button>
                    </MenuItem>
                    <MenuItem
                        _hover={{ backgroundColor: 'transparent', cursor: 'default' }}
                        _focus={{ backgroundColor: 'transparent', cursor: 'default' }}
                    ><Button colorScheme="twitter" leftIcon={<FaTwitter />}>
                            Twitter
                        </Button></MenuItem>
                    <MenuItem
                        _hover={{ backgroundColor: 'transparent', cursor: 'default' }}
                        _focus={{ backgroundColor: 'transparent', cursor: 'default' }}>
                        <Button bgGradient="linear(to-l, #7928CA, #FF0080)" _hover={{
                            bgGradient: "linear(to-r, gray.300, yellow.400, pink.200)",
                        }} leftIcon={<FaInstagram />}>
                            Instagram
                        </Button>
                    </MenuItem>
                    <MenuItem
                        _hover={{ backgroundColor: 'transparent', cursor: 'default' }}
                        _focus={{ backgroundColor: 'transparent', cursor: 'default' }}>
                        <Button colorScheme="telegram" leftIcon={<FaTelegramPlane />}>
                            Telegram
                        </Button></MenuItem>
                    <MenuItem
                        _hover={{ backgroundColor: 'transparent', cursor: 'default' }}
                        _focus={{ backgroundColor: 'transparent', cursor: 'default' }}>
                        <Button colorScheme="messenger" leftIcon={<FaVk />}>
                            VKontakte
                        </Button></MenuItem>
                    <MenuItem
                        _hover={{ backgroundColor: 'transparent', cursor: 'default' }}
                        _focus={{ backgroundColor: 'transparent', cursor: 'default' }}>
                        <Button colorScheme="whatsapp" leftIcon={<FaWhatsapp />}>
                            Whatsapp
                        </Button>
                    </MenuItem>
                </MenuList>
            </Menu>
        </div>
    )
}

export default MenuM;