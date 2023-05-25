import React, { useEffect, useState } from 'react';
import Profile from './components/Profile';
import Product from './components/Product';
import Header from './components/Header';
import LoginModal from './components/Modals/LoginModal';
import ProfileModal from './components/Modals/ProfileModal';
import ProductModal from './components/Modals/ProductModal';
import OrderModal from './components/Modals/OrderModal';
import userInfos from './user.json';
import { crypt } from './utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    const [currentUser, setCurrentUser] = useState({});
    const [profileInfo, setProfileInfo] = useState({});
    const [products, setProducts] = useState([]);
    const [editProducts, setEditProducts] = useState([]);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showProductModal, setShowProductModal] = useState(false);
    const [showOrderModal, setShowOrderModal] = useState(false);

    useEffect(() => {
        const info = localStorage.getItem('dreamerly_user_info');
        const profileData = localStorage.getItem('dreamerly_profile_info');
        const productData = localStorage.getItem('dreamerly_product_data');
        if (info) {
            const { username, role } = JSON.parse(info);
            setCurrentUser({
                username: username,
                role: role
            });
        };
        if (profileData) {
            setProfileInfo(JSON.parse(profileData));
        } else {
            const data = {
                name: 'John Doe',
                phone: '555-555-5555',
                description: 'This is John Doe who has rich experiences in marketing.'
            };
            localStorage.setItem('dreamerly_profile_info', JSON.stringify(data));
            setProfileInfo(data);
        };
        if (productData) {
            setProducts(JSON.parse(productData));
        } else {
            const data = [
                { name: 'product1', price: '49', description: 'This is product1' },
                { name: 'product2', price: '18', description: 'This is product1' },
                { name: 'product3', price: '11', description: 'This is product1' },
                { name: 'product4', price: '34', description: 'This is product1' },
                { name: 'product5', price: '23', description: 'This is product1' }
            ];
            localStorage.setItem('dreamerly_product_data', JSON.stringify(data));
            setProducts(data);
        };
    }, []);

    const login = (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        const oldUser = userInfos.find(user => user.username === username);

        if (oldUser) {
            const isMatch = password === crypt(oldUser.password, 'd');
            if (isMatch) {
                const info = {
                    username: username,
                    role: oldUser.role
                };
                localStorage.setItem('dreamerly_user_info', JSON.stringify(info));
                setCurrentUser(info);
                setShowLoginModal(false);
                toast.success('Login successful!');
            } else {
                toast.error('Wrong password!');
            };
        } else {
            toast.error('Wrong username!');
        };
    };

    const logout = () => {
        setCurrentUser({});
        localStorage.removeItem('dreamerly_user_info');
    };

    const handleLoginModalOpen = () => {
        setShowLoginModal(true);
    };

    const handleLoginModalClose = () => {
        setShowLoginModal(false);
    };

    const saveProfileInfo = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const phone = e.target.phone.value;
        const description = e.target.description.value;
        const data = {
            name: name,
            phone: phone,
            description: description
        };
        localStorage.setItem('dreamerly_profile_info', JSON.stringify(data));
        setProfileInfo({
            name,
            phone,
            description
        });
        handleProfileModalClose();
        toast.success('Profile successfully updated!');
    };

    const handleProfileModalOpen = () => {
        setShowProfileModal(true);
    };

    const handleProfileModalClose = () => {
        setShowProfileModal(false);
    };

    const addProduct = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const description = e.target.description.value;
        const price = e.target.price.value;

        if (products.some(product => product.name === name)) {
            toast('Products already exists!');
        } else {
            let data = products;
            data.push({
                name,
                description,
                price
            });
            setProducts(data);
            localStorage.setItem('dreamerly_product_data', JSON.stringify(data));
            setShowProductModal(false);
            toast.success('Product successfully added!');
        };
    };

    const removeProduct = (index) => {
        let data = products;
        data = [...data.slice(0, index), ...data.slice(index + 1)];
        setProducts(data);
        localStorage.setItem('dreamerly_product_data', JSON.stringify(data));
        toast.success('Product successfully removed!');
    };

    const handleProductModalOpen = () => {
        setShowProductModal(true);
    };

    const handleProductModalClose = () => {
        setShowProductModal(false);
    };

    const saveOrder = (e) => {
        e.preventDefault();
        setProducts(editProducts);
        localStorage.setItem('dreamerly_product_data', JSON.stringify(editProducts));
        handleOrderModalClose();
        toast.success('Order successfully changed!');
    };

    const upOrder = (index) => {
        if (index !== 0) {
            let currentProducts = [...editProducts];
            const temp = currentProducts[index - 1];
            currentProducts[index - 1] = currentProducts[index];
            currentProducts[index] = temp;
            setEditProducts(currentProducts);
        };
    };

    const downOrder = (index) => {
        if (index !== editProducts.length - 1) {
            let currentProducts = [...editProducts];
            const temp = currentProducts[index];
            currentProducts[index] = currentProducts[index + 1];
            currentProducts[index + 1] = temp;
            setEditProducts(currentProducts);
        };
    };

    const handleOrderModalOpen = () => {
        setEditProducts(products);
        setShowOrderModal(true);
    };

    const handleOrderModalClose = () => {
        setShowOrderModal(false);
    };

    return (
        <>
            <Header
                currentUser={currentUser}
                showLoginModal={handleLoginModalOpen}
                logout={logout}
            />
            <div className='p-4 mx-auto'>
                <Profile
                    profileInfo={profileInfo}
                    showProfileModal={handleProfileModalOpen}
                    userRole={currentUser?.role}
                />
                <Product
                    products={products}
                    removeProduct={removeProduct}
                    showProductModal={handleProductModalOpen}
                    showOrderModal={handleOrderModalOpen}
                    userRole={currentUser?.role}
                />
            </div>
            <ToastContainer
                position='top-right'
                autoClose={3000}
            />
            {showLoginModal && (
                <LoginModal
                    login={login}
                    onClose={handleLoginModalClose}
                />
            )}
            {showProfileModal && (
                <ProfileModal
                    profileInfo={profileInfo}
                    saveProfileInfo={saveProfileInfo}
                    onClose={handleProfileModalClose}
                />
            )}
            {showProductModal && (
                <ProductModal
                    addProduct={addProduct}
                    onClose={handleProductModalClose}
                />
            )}
            {
                showOrderModal && (
                    <OrderModal
                        editProducts={editProducts}
                        upOrder={upOrder}
                        downOrder={downOrder}
                        saveOrder={saveOrder}
                        onClose={handleOrderModalClose}
                    />
                )
            }
        </>
    );
};

export default App;