# 📄 Discount PRO: A Coupon Collecting Application  

Discount PRO is a single-page web application designed to help users easily discover, collect, and use discount coupons for popular e-commerce stores in Bangladesh. The platform offers a winter-themed design, advanced features like Google authentication, and secure private routes, ensuring a smooth user experience.  

---  

## 🌟 Live Preview  
Check out the live version here: [Live Application Link](#)  

---  

## 🛠 Features  

### Core Features  
- **Coupon Management**:  
  - View coupons by brand.  
  - **Copy Coupon Code**: Instantly copy coupon codes to the clipboard.  
  - Navigate to brand websites for direct coupon usage.  
- **Responsive Design**:  
  - Fully responsive across mobile, tablet, and desktop devices.  
- **Authentication**:  
  - **Login with Google**: Secure and fast Google authentication.  
  - Email/password login and signup.  
  - Log out functionality with user feedback.  
- **Dynamic Filtering**:  
  - Filter and search brands based on active sales.  
  - Highlight discounts with animated labels.  
- **Private Routes**:  
  - Sensitive pages like profile management and brand details are secured, accessible only to logged-in users.  

### Additional Features  
- **Profile Management**:  
  - Update profile details (photo & name) dynamically with real-time updates.  
  - Personalized greeting upon login.  
- **Customer Reviews**:  
  - Showcase customer feedback for individual brands and the platform.  
- **Animations**:  
  - **Marquee Animation**: Engaging "Top Brands" marquee showcasing brand logos.  
  - Smooth UI animations using AOS and Animate.css for an enhanced experience.  
- **Error Handling**:  
  - Custom 404 page with navigation back to the homepage.  

---  

## 🔧 Tech Stack  

### Frontend  
- **React.js**: For building the user interface.  
- **Tailwind CSS**: For modern, responsive design.  
- **Material UI**: For prebuilt, customizable UI components.  
- **React Router DOM**: For routing and navigation.  

### Backend & Authentication  
- **Firebase Authentication**: For secure user login and signup, including Google authentication.  

### Additional Tools  
- **React Icons**: For iconography.  
- **React Toastify**: For displaying toast notifications.  
- **AOS & Animate.css**: For beautiful animations.  
- **React Marquee**: For showcasing brands with an animated marquee.  
- **React Copy to Clipboard**: For seamless coupon code copying.  

---  

## 📁 JSON Data Structure  

### Brand Data  
```json  
{  
  "_id": "unique_id",  
  "brand_name": "Brand Name",  
  "rating": 4.5,  
  "description": "Brand Description",  
  "brand_logo": "URL to logo",  
  "coupons": [  
    {  
      "coupon_code": "SAVE20",  
      "description": "20% off on all products",  
      "expiry_date": "2024-12-31",  
      "condition": "Min purchase BDT 1000",  
      "coupon_type": "Flat Discount"  
    }  
  ],  
  "shop_link": "URL to shop",  
  "category": "Electronics",  
  "isSaleOn": true  
}  
