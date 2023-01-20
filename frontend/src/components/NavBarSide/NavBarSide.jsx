import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { NavLink } from 'react-router-dom';
import "./NavBarSide.css"

const NavBarSide = () => {
    const dispatch = useDispatch();
    const logoutUser = e => {
        e.preventDefault();
        dispatch(logout());
    }

  return (
    <header>
        <div className="innerHeader">
                    <div>
                        <div className="logo">
                            <a href="/">
                                <svg width="64" height="24" viewBox="0 0 64 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.48047 8.125C7.75391 7.57812 8.02734 7.03776 8.30078 6.50391C8.57422 5.95703 8.82161 5.44922 9.04297 4.98047C9.26432 4.51172 9.45312 4.09505 9.60938 3.73047C9.76562 3.35286 9.85677 3.05339 9.88281 2.83203C9.90885 2.59766 9.88932 2.39583 9.82422 2.22656C9.75911 2.05729 9.64844 1.92057 9.49219 1.81641C9.34896 1.71224 9.17318 1.63411 8.96484 1.58203C8.76953 1.51693 8.54818 1.47786 8.30078 1.46484C7.87109 1.4388 7.35677 1.45182 6.75781 1.50391C6.17188 1.54297 5.60547 1.6276 5.05859 1.75781C4.51172 1.875 4.03646 2.04427 3.63281 2.26562C3.24219 2.48698 3.03385 2.76042 3.00781 3.08594C2.99479 3.26823 3.02734 3.43099 3.10547 3.57422C3.17057 3.69141 3.28776 3.80208 3.45703 3.90625C3.63932 4.01042 3.90625 4.04948 4.25781 4.02344C4.32292 4.02344 4.40104 4.01693 4.49219 4.00391C4.57031 3.99089 4.66797 3.97786 4.78516 3.96484C4.90234 3.9388 5.03906 3.90625 5.19531 3.86719L4.23828 5.15625C4.05599 5.41667 3.86068 5.57292 3.65234 5.625C3.44401 5.67708 3.25521 5.6901 3.08594 5.66406C2.99479 5.65104 2.8125 5.60547 2.53906 5.52734C2.27865 5.44922 2.01172 5.33203 1.73828 5.17578C1.47786 5.01953 1.25 4.8112 1.05469 4.55078C0.859375 4.27734 0.78125 3.9388 0.820312 3.53516C0.872396 3.06641 1.07422 2.63672 1.42578 2.24609C1.77734 1.84245 2.26562 1.4974 2.89062 1.21094C3.52865 0.924479 4.28385 0.703125 5.15625 0.546875C6.04167 0.390625 7.03776 0.3125 8.14453 0.3125C8.97786 0.3125 9.64193 0.403646 10.1367 0.585938C10.6315 0.755208 10.9896 0.983073 11.2109 1.26953C11.4453 1.54297 11.556 1.86849 11.543 2.24609C11.543 2.61068 11.4648 2.98828 11.3086 3.37891C11.2305 3.5612 11.1133 3.8151 10.957 4.14062C10.8138 4.45312 10.638 4.82422 10.4297 5.25391C10.2214 5.67057 10 6.13281 9.76562 6.64062C9.53125 7.14844 9.29688 7.67578 9.0625 8.22266C9.41406 8.2487 9.73307 8.28125 10.0195 8.32031C10.319 8.35938 10.5534 8.39193 10.7227 8.41797C10.918 8.47005 10.9831 8.55469 10.918 8.67188C10.8008 8.90625 10.6836 9.08203 10.5664 9.19922C10.4622 9.31641 10.3451 9.40104 10.2148 9.45312C10.0846 9.49219 9.94141 9.51172 9.78516 9.51172C9.62891 9.4987 9.45312 9.48568 9.25781 9.47266C9.14062 9.47266 9.02344 9.47266 8.90625 9.47266C8.78906 9.45964 8.66536 9.44661 8.53516 9.43359C8.28776 10.0195 8.04688 10.599 7.8125 11.1719C7.59115 11.7448 7.38281 12.2917 7.1875 12.8125C7.00521 13.3203 6.84245 13.7891 6.69922 14.2188C6.55599 14.6484 6.45833 15.0065 6.40625 15.293C6.32812 15.6966 6.26953 16.0742 6.23047 16.4258C6.20443 16.7253 6.19141 17.0378 6.19141 17.3633C6.19141 17.6888 6.24349 17.9492 6.34766 18.1445C6.07422 18.2227 5.83333 18.2878 5.625 18.3398C5.42969 18.3919 5.26042 18.431 5.11719 18.457C4.96094 18.4961 4.83073 18.5286 4.72656 18.5547C4.36198 18.6458 4.10156 18.6328 3.94531 18.5156C3.80208 18.4115 3.76302 18.151 3.82812 17.7344C3.85417 17.4479 3.89323 17.1224 3.94531 16.7578C4.01042 16.4062 4.10156 16.0026 4.21875 15.5469C4.34896 15.1042 4.51172 14.6094 4.70703 14.0625C4.91536 13.5026 5.17578 12.8841 5.48828 12.207C5.67057 11.8164 5.87891 11.3867 6.11328 10.918C6.34766 10.4362 6.59505 9.92188 6.85547 9.375C6.28255 9.375 5.66406 9.41406 5 9.49219C4.63542 9.54427 4.27734 9.60286 3.92578 9.66797C3.6263 9.73307 3.30078 9.8112 2.94922 9.90234C2.61068 9.98047 2.29167 10.0716 1.99219 10.1758C1.95312 10.0716 1.92708 9.96745 1.91406 9.86328C1.91406 9.75911 1.92057 9.66146 1.93359 9.57031C1.94661 9.47917 1.96615 9.38802 1.99219 9.29688C2.01823 9.20573 2.05729 9.11458 2.10938 9.02344C2.1875 8.86719 2.3112 8.67188 2.48047 8.4375C3.09245 8.35938 3.67839 8.30078 4.23828 8.26172C4.79818 8.22266 5.29297 8.1901 5.72266 8.16406C6.23047 8.13802 6.70573 8.125 7.14844 8.125C7.21354 8.11198 7.26562 8.11198 7.30469 8.125C7.35677 8.125 7.41536 8.125 7.48047 8.125Z" fill="currentColor"/>
                                <path d="M10.9766 14.9023C10.8854 15.0456 10.7878 15.1367 10.6836 15.1758C10.5664 15.2279 10.4688 15.2344 10.3906 15.1953C10.2995 15.1693 10.2409 15.1042 10.2148 15C10.1888 14.8958 10.2148 14.7656 10.293 14.6094C10.332 14.5312 10.4232 14.3555 10.5664 14.082C10.6966 13.8086 10.8594 13.4831 11.0547 13.1055C11.237 12.7148 11.4388 12.2982 11.6602 11.8555C11.8815 11.3997 12.0898 10.9701 12.2852 10.5664C12.4935 10.1628 12.6823 9.80469 12.8516 9.49219C13.0208 9.16667 13.1445 8.93229 13.2227 8.78906C13.0794 8.65885 12.9818 8.56771 12.9297 8.51562C12.8776 8.45052 12.8385 8.32031 12.8125 8.125C12.7865 7.95573 12.8255 7.73438 12.9297 7.46094C13.0339 7.1875 13.1706 6.92708 13.3398 6.67969C13.5091 6.41927 13.6979 6.19792 13.9062 6.01562C14.1146 5.83333 14.3164 5.74219 14.5117 5.74219C14.8763 5.74219 15.1302 5.85938 15.2734 6.09375C15.4297 6.32812 15.5208 6.56901 15.5469 6.81641C15.5729 6.98568 15.5599 7.20052 15.5078 7.46094C15.4557 7.72135 15.3581 7.95573 15.2148 8.16406C15.2539 8.1901 15.306 8.22266 15.3711 8.26172C15.4362 8.28776 15.5404 8.30078 15.6836 8.30078C15.8919 8.30078 16.0352 8.28776 16.1133 8.26172C16.2044 8.23568 16.3411 8.22266 16.5234 8.22266C16.7448 8.22266 16.9271 8.28125 17.0703 8.39844C17.2135 8.5026 17.3307 8.63932 17.4219 8.80859C17.513 8.96484 17.5781 9.14062 17.6172 9.33594C17.6693 9.51823 17.7018 9.6875 17.7148 9.84375C17.7539 10.1693 17.6693 10.5078 17.4609 10.8594C17.2526 11.2109 16.9987 11.5951 16.6992 12.0117C16.5169 12.2721 16.3346 12.5651 16.1523 12.8906C15.9701 13.2161 15.8919 13.5091 15.918 13.7695C15.944 13.9388 15.9896 14.0755 16.0547 14.1797C16.1198 14.2839 16.3021 14.3359 16.6016 14.3359C16.8229 14.3359 17.0638 14.2578 17.3242 14.1016C17.5977 13.9323 17.8711 13.724 18.1445 13.4766C18.431 13.2161 18.7109 12.9362 18.9844 12.6367C19.2578 12.3242 19.5117 12.0247 19.7461 11.7383C19.9805 11.4388 20.1758 11.1719 20.332 10.9375C20.5013 10.7031 20.625 10.5339 20.7031 10.4297C20.7682 10.3255 20.8529 10.2539 20.957 10.2148C21.0612 10.1758 21.1523 10.1758 21.2305 10.2148C21.3086 10.2539 21.3542 10.332 21.3672 10.4492C21.3932 10.5664 21.3477 10.7227 21.2305 10.918C21.1523 11.0482 21.0156 11.2565 20.8203 11.543C20.638 11.8294 20.4102 12.1484 20.1367 12.5C19.8763 12.8516 19.5833 13.2161 19.2578 13.5938C18.9323 13.9583 18.5872 14.2969 18.2227 14.6094C17.8711 14.9089 17.513 15.1562 17.1484 15.3516C16.7969 15.5469 16.4583 15.6445 16.1328 15.6445C15.7943 15.6445 15.5143 15.5794 15.293 15.4492C15.0716 15.319 14.8893 15.1628 14.7461 14.9805C14.6159 14.7852 14.5182 14.5768 14.4531 14.3555C14.401 14.1211 14.3815 13.9062 14.3945 13.7109C14.4076 13.5547 14.4466 13.3919 14.5117 13.2227C14.5898 13.0404 14.6745 12.8581 14.7656 12.6758C14.8698 12.4805 14.974 12.2917 15.0781 12.1094C15.1953 11.9141 15.2995 11.7253 15.3906 11.543C15.612 11.1654 15.7878 10.8464 15.918 10.5859C16.0612 10.3125 16.1328 10.0846 16.1328 9.90234C16.1328 9.78516 16.1068 9.68099 16.0547 9.58984C16.0026 9.4987 15.918 9.45312 15.8008 9.45312C15.7227 9.45312 15.6641 9.45964 15.625 9.47266C15.599 9.47266 15.5664 9.47266 15.5273 9.47266C15.5013 9.47266 15.4557 9.47917 15.3906 9.49219C15.3385 9.49219 15.2539 9.49219 15.1367 9.49219C14.9674 9.49219 14.8242 9.46615 14.707 9.41406C14.5898 9.36198 14.4792 9.32292 14.375 9.29688C14.3229 9.38802 14.2057 9.58333 14.0234 9.88281C13.8411 10.1823 13.6263 10.5339 13.3789 10.9375C13.1445 11.3411 12.8906 11.7643 12.6172 12.207C12.3568 12.6497 12.1094 13.0664 11.875 13.457C11.6406 13.8346 11.4453 14.1602 11.2891 14.4336C11.1198 14.694 11.0156 14.8503 10.9766 14.9023Z" fill="currentColor"/>
                                <path d="M24.1406 3.49609C24.1016 3.63932 24.0234 3.78255 23.9062 3.92578C23.8021 4.05599 23.6784 4.16667 23.5352 4.25781C23.4049 4.33594 23.2682 4.38802 23.125 4.41406C22.9818 4.4401 22.8646 4.41406 22.7734 4.33594C22.5 4.1276 22.3568 3.90625 22.3438 3.67188C22.3307 3.42448 22.3893 3.19661 22.5195 2.98828C22.6497 2.76693 22.8125 2.58464 23.0078 2.44141C23.2031 2.28516 23.3724 2.19401 23.5156 2.16797C23.6589 2.14193 23.776 2.17448 23.8672 2.26562C23.9714 2.34375 24.0495 2.45443 24.1016 2.59766C24.1536 2.72786 24.1797 2.8776 24.1797 3.04688C24.1927 3.21615 24.1797 3.36589 24.1406 3.49609ZM21.4453 7.65625C21.5104 7.57812 21.6341 7.51302 21.8164 7.46094C21.9987 7.40885 22.1875 7.36979 22.3828 7.34375C22.5781 7.30469 22.7539 7.28516 22.9102 7.28516C23.0794 7.27214 23.1771 7.27214 23.2031 7.28516C23.2161 7.29818 23.1836 7.4349 23.1055 7.69531C23.0273 7.95573 22.9297 8.26172 22.8125 8.61328C22.6953 8.96484 22.5716 9.32943 22.4414 9.70703C22.3112 10.0716 22.2135 10.3711 22.1484 10.6055C22.0833 10.8398 22.0052 11.1068 21.9141 11.4062C21.8229 11.6927 21.7383 11.9792 21.6602 12.2656C21.5951 12.5391 21.5495 12.7995 21.5234 13.0469C21.4974 13.2943 21.5169 13.4831 21.582 13.6133C21.6471 13.7695 21.7188 13.8802 21.7969 13.9453C21.875 13.9974 21.9596 14.0234 22.0508 14.0234C22.3112 14.0234 22.6367 13.8802 23.0273 13.5938C23.431 13.3073 23.8346 12.9688 24.2383 12.5781C24.6549 12.1745 25.0391 11.7708 25.3906 11.3672C25.7422 10.9505 26.0026 10.6185 26.1719 10.3711C26.276 10.2409 26.3802 10.1562 26.4844 10.1172C26.6016 10.0781 26.6927 10.0846 26.7578 10.1367C26.8359 10.1888 26.875 10.2734 26.875 10.3906C26.888 10.5078 26.849 10.6445 26.7578 10.8008C26.5495 11.1654 26.2435 11.6016 25.8398 12.1094C25.4362 12.6042 25.0065 13.0859 24.5508 13.5547C24.0951 14.0104 23.6458 14.401 23.2031 14.7266C22.7734 15.0521 22.4219 15.2214 22.1484 15.2344C21.9271 15.2474 21.7057 15.2083 21.4844 15.1172C21.276 15.0391 21.0807 14.9284 20.8984 14.7852C20.7292 14.6289 20.5859 14.4531 20.4688 14.2578C20.3516 14.0495 20.2865 13.8346 20.2734 13.6133C20.2344 13.2878 20.2344 12.8451 20.2734 12.2852C20.3125 11.7122 20.3841 11.1328 20.4883 10.5469C20.5924 9.94792 20.7227 9.38151 20.8789 8.84766C21.0482 8.3138 21.237 7.91667 21.4453 7.65625Z" fill="currentColor"/>
                                <path d="M34.1797 10.9375C33.7891 11.5104 33.3464 12.0703 32.8516 12.6172C32.3568 13.151 31.8294 13.6328 31.2695 14.0625C30.7227 14.4792 30.1562 14.8177 29.5703 15.0781C28.9974 15.3385 28.4375 15.4688 27.8906 15.4688C27.6042 15.4688 27.2917 15.3971 26.9531 15.2539C26.6276 15.1237 26.3281 14.9154 26.0547 14.6289C25.7812 14.3424 25.5599 13.9714 25.3906 13.5156C25.2344 13.0599 25.1888 12.5065 25.2539 11.8555C25.306 11.3216 25.4688 10.7617 25.7422 10.1758C26.0286 9.57682 26.3737 9.02995 26.7773 8.53516C27.194 8.04036 27.6562 7.63021 28.1641 7.30469C28.6849 6.97917 29.2057 6.81641 29.7266 6.81641C30.2214 6.81641 30.5794 6.9401 30.8008 7.1875C31.0221 7.4349 31.1198 7.74089 31.0938 8.10547C31.0547 8.50911 30.9375 8.88021 30.7422 9.21875C30.5599 9.55729 30.3385 9.86328 30.0781 10.1367C29.8177 10.4102 29.5378 10.6576 29.2383 10.8789C28.9518 11.1003 28.6784 11.3021 28.418 11.4844C28.1315 11.6797 27.8581 11.8685 27.5977 12.0508C27.3372 12.2201 27.1094 12.3763 26.9141 12.5195C26.9271 12.8451 26.9857 13.1185 27.0898 13.3398C27.194 13.5612 27.3242 13.7435 27.4805 13.8867C27.6367 14.0169 27.8125 14.1146 28.0078 14.1797C28.2161 14.2318 28.4245 14.2578 28.6328 14.2578C29.0755 14.2578 29.5378 14.1211 30.0195 13.8477C30.5013 13.5612 30.9701 13.2227 31.4258 12.832C31.8945 12.4284 32.3242 12.0117 32.7148 11.582C33.1185 11.1523 33.4505 10.7812 33.7109 10.4688C33.8021 10.3646 33.8932 10.306 33.9844 10.293C34.0885 10.2669 34.1667 10.2799 34.2188 10.332C34.2839 10.3711 34.3164 10.4492 34.3164 10.5664C34.3164 10.6706 34.2708 10.7943 34.1797 10.9375ZM29.1797 7.92969C29.0234 7.92969 28.8346 8.00781 28.6133 8.16406C28.4049 8.32031 28.1966 8.54818 27.9883 8.84766C27.7799 9.13411 27.5846 9.49219 27.4023 9.92188C27.2201 10.3385 27.0833 10.8203 26.9922 11.3672C27.1484 11.25 27.3177 11.1328 27.5 11.0156C27.6823 10.8854 27.8646 10.7487 28.0469 10.6055C28.6068 10.1758 28.9974 9.79818 29.2188 9.47266C29.4401 9.14714 29.5638 8.86719 29.5898 8.63281C29.6159 8.38542 29.5898 8.20964 29.5117 8.10547C29.4336 7.98828 29.3229 7.92969 29.1797 7.92969Z" fill="currentColor"/>
                                <path d="M38.5742 15.4883C38.2747 15.4883 38.0143 15.4297 37.793 15.3125C37.5846 15.2083 37.4154 15.0651 37.2852 14.8828C37.1549 14.7005 37.0703 14.4922 37.0312 14.2578C36.9922 14.0104 37.0052 13.75 37.0703 13.4766C37.1094 13.2943 37.1745 13.0534 37.2656 12.7539C37.3568 12.4414 37.4479 12.1094 37.5391 11.7578C37.6432 11.3932 37.7344 11.0352 37.8125 10.6836C37.9036 10.319 37.9622 9.99349 37.9883 9.70703C38.0143 9.40755 38.0013 9.16667 37.9492 8.98438C37.8971 8.78906 37.7865 8.69141 37.6172 8.69141C37.4089 8.69141 37.194 8.76302 36.9727 8.90625C36.7513 9.03646 36.5234 9.21875 36.2891 9.45312C36.0677 9.6875 35.8398 9.96094 35.6055 10.2734C35.3841 10.5729 35.1628 10.8854 34.9414 11.2109C34.8242 11.6536 34.7266 12.0443 34.6484 12.3828C34.5703 12.7083 34.4987 13.0078 34.4336 13.2812C34.3815 13.5417 34.3294 13.776 34.2773 13.9844C34.2253 14.1797 34.1797 14.3685 34.1406 14.5508C34.1016 14.681 33.9844 14.8112 33.7891 14.9414C33.5938 15.0586 33.3854 15.1562 33.1641 15.2344C32.9427 15.3125 32.7539 15.3516 32.5977 15.3516C32.4284 15.3516 32.3568 15.293 32.3828 15.1758C32.3958 15.0977 32.4414 14.9219 32.5195 14.6484C32.5846 14.375 32.6693 14.056 32.7734 13.6914C32.8646 13.3138 32.9622 12.9167 33.0664 12.5C33.1706 12.0833 33.2682 11.6862 33.3594 11.3086C33.4245 11.0091 33.4961 10.6771 33.5742 10.3125C33.6393 10 33.7174 9.63542 33.8086 9.21875C33.9128 8.80208 34.0299 8.34635 34.1602 7.85156C34.2513 7.77344 34.3424 7.71484 34.4336 7.67578C34.5378 7.6237 34.6419 7.58464 34.7461 7.55859C34.8503 7.51953 34.9609 7.49349 35.0781 7.48047C35.1823 7.48047 35.2865 7.48698 35.3906 7.5C35.4818 7.51302 35.5729 7.53906 35.6641 7.57812C35.7682 7.60417 35.8594 7.64974 35.9375 7.71484C35.8984 7.80599 35.8529 7.9362 35.8008 8.10547C35.7487 8.26172 35.6966 8.43099 35.6445 8.61328C35.5924 8.82161 35.5273 9.03646 35.4492 9.25781C35.6185 9.02344 35.8073 8.78906 36.0156 8.55469C36.237 8.30729 36.4714 8.08594 36.7188 7.89062C36.9792 7.69531 37.2526 7.53906 37.5391 7.42188C37.8255 7.29167 38.1185 7.22656 38.418 7.22656C38.6654 7.22656 38.8867 7.29818 39.082 7.44141C39.2773 7.58464 39.4271 7.78646 39.5312 8.04688C39.6484 8.29427 39.7135 8.59375 39.7266 8.94531C39.7526 9.29688 39.707 9.68099 39.5898 10.0977L39.375 10.957C39.3099 11.2305 39.2253 11.556 39.1211 11.9336C39.0299 12.2982 38.9128 12.7018 38.7695 13.1445C38.6914 13.431 38.6589 13.6784 38.6719 13.8867C38.6979 14.0951 38.8281 14.1992 39.0625 14.1992C39.2969 14.1992 39.5898 14.056 39.9414 13.7695C40.306 13.4831 40.6706 13.138 41.0352 12.7344C41.3997 12.3307 41.7448 11.9206 42.0703 11.5039C42.3958 11.0742 42.6432 10.7292 42.8125 10.4688C42.9297 10.2995 43.0404 10.1888 43.1445 10.1367C43.2487 10.0846 43.3268 10.0781 43.3789 10.1172C43.444 10.1562 43.4766 10.2474 43.4766 10.3906C43.4766 10.5208 43.4245 10.6901 43.3203 10.8984C43.2292 11.0807 43.0859 11.3216 42.8906 11.6211C42.7083 11.9206 42.487 12.2396 42.2266 12.5781C41.9661 12.9167 41.6862 13.2617 41.3867 13.6133C41.0872 13.9518 40.7747 14.2643 40.4492 14.5508C40.1237 14.8242 39.7982 15.0456 39.4727 15.2148C39.1602 15.3971 38.8607 15.4883 38.5742 15.4883Z" fill="currentColor"/>
                                <path d="M48.2227 11.2695C48.1576 11.6732 48.0924 12.0573 48.0273 12.4219C47.9753 12.7865 47.9427 13.0794 47.9297 13.3008C47.9167 13.6263 47.9753 13.8607 48.1055 14.0039C48.2357 14.1471 48.3789 14.2188 48.5352 14.2188C48.7174 14.2188 48.9388 14.1276 49.1992 13.9453C49.4727 13.763 49.7591 13.5352 50.0586 13.2617C50.3581 12.9883 50.6576 12.6888 50.957 12.3633C51.2565 12.0378 51.5299 11.7318 51.7773 11.4453C52.0378 11.1458 52.2526 10.8854 52.4219 10.6641C52.6042 10.4427 52.7279 10.2995 52.793 10.2344C52.8711 10.1562 52.9492 10.1107 53.0273 10.0977C53.1185 10.0846 53.1901 10.0977 53.2422 10.1367C53.2943 10.1758 53.3203 10.2474 53.3203 10.3516C53.3203 10.4557 53.2682 10.5859 53.1641 10.7422C53.0078 10.9896 52.806 11.2826 52.5586 11.6211C52.3112 11.9466 52.0378 12.2852 51.7383 12.6367C51.4388 12.9883 51.1198 13.3333 50.7812 13.6719C50.4557 14.0104 50.1237 14.3099 49.7852 14.5703C49.4596 14.8307 49.1406 15.0391 48.8281 15.1953C48.5286 15.3646 48.2552 15.4492 48.0078 15.4492C47.8255 15.4492 47.6497 15.3971 47.4805 15.293C47.3242 15.1888 47.181 15.0521 47.0508 14.8828C46.9206 14.7135 46.8164 14.5247 46.7383 14.3164C46.6732 14.1081 46.6471 13.8997 46.6602 13.6914C46.6732 13.6003 46.6927 13.444 46.7188 13.2227C46.1719 13.8346 45.6185 14.3229 45.0586 14.6875C44.5117 15.0391 43.9844 15.2148 43.4766 15.2148C43.2943 15.2148 43.099 15.1693 42.8906 15.0781C42.6823 14.987 42.4935 14.8372 42.3242 14.6289C42.168 14.4206 42.0378 14.1471 41.9336 13.8086C41.8294 13.4701 41.7904 13.0599 41.8164 12.5781C41.8555 11.8229 42.0052 11.1068 42.2656 10.4297C42.526 9.7526 42.8516 9.16667 43.2422 8.67188C43.6458 8.16406 44.0951 7.76693 44.5898 7.48047C45.0977 7.18099 45.6055 7.03125 46.1133 7.03125C46.3346 7.03125 46.5365 7.08984 46.7188 7.20703C46.901 7.3112 47.0573 7.45443 47.1875 7.63672C47.3177 7.80599 47.4219 7.99479 47.5 8.20312C47.5911 8.41146 47.6562 8.60677 47.6953 8.78906C47.7865 8.41146 47.8711 8.04036 47.9492 7.67578C48.0273 7.3112 48.1055 6.96615 48.1836 6.64062C48.3138 6.15885 48.4505 5.63802 48.5938 5.07812C48.724 4.59635 48.8737 4.04297 49.043 3.41797C49.2122 2.79297 49.401 2.13542 49.6094 1.44531C49.7396 1.34115 49.8633 1.26302 49.9805 1.21094C50.0977 1.15885 50.2083 1.11979 50.3125 1.09375C50.4297 1.05469 50.5404 1.03516 50.6445 1.03516C50.7747 1.03516 50.8919 1.05469 50.9961 1.09375C51.1003 1.11979 51.1849 1.20443 51.25 1.34766C51.3281 1.47786 51.3802 1.67969 51.4062 1.95312C51.4323 2.22656 51.4323 2.59766 51.4062 3.06641C51.3802 3.63932 51.276 4.26432 51.0938 4.94141C50.9245 5.61849 50.6966 6.32161 50.4102 7.05078C50.1237 7.76693 49.7917 8.48958 49.4141 9.21875C49.0495 9.9349 48.6523 10.6185 48.2227 11.2695ZM47.0703 11.5234C47.1224 11.276 47.168 11.0286 47.207 10.7812C47.2591 10.5339 47.3177 10.2799 47.3828 10.0195C47.3568 10.0326 47.3307 10.0456 47.3047 10.0586C47.2917 10.0716 47.2721 10.0846 47.2461 10.0977C47.1029 10.1628 47.0052 10.1628 46.9531 10.0977C46.901 10.0195 46.875 9.90234 46.875 9.74609C46.875 9.66797 46.8685 9.53125 46.8555 9.33594C46.8424 9.1276 46.8034 8.91927 46.7383 8.71094C46.6862 8.48958 46.6016 8.30078 46.4844 8.14453C46.3672 7.97526 46.2044 7.89062 45.9961 7.89062C45.6966 7.89062 45.3906 8.04688 45.0781 8.35938C44.7656 8.65885 44.4727 9.02995 44.1992 9.47266C43.9258 9.90234 43.6979 10.3646 43.5156 10.8594C43.3333 11.3542 43.2292 11.7969 43.2031 12.1875C43.1771 12.8125 43.2552 13.2617 43.4375 13.5352C43.6198 13.8086 43.8672 13.9453 44.1797 13.9453C44.4141 13.9453 44.668 13.8542 44.9414 13.6719C45.2279 13.4896 45.5013 13.2682 45.7617 13.0078C46.0352 12.7474 46.2826 12.4805 46.5039 12.207C46.7383 11.9336 46.9271 11.7057 47.0703 11.5234Z" fill="currentColor"/>
                                <path d="M51.3867 14.6875C51.9596 12.2786 52.4154 10.3451 52.7539 8.88672C53.1055 7.42839 53.3724 6.3151 53.5547 5.54688C53.763 4.63542 53.9062 4.00391 53.9844 3.65234C54.0234 3.40495 54.056 3.16406 54.082 2.92969C54.1081 2.72135 54.1211 2.50651 54.1211 2.28516C54.1211 2.0638 54.1016 1.86198 54.0625 1.67969C54.1667 1.61458 54.2773 1.5625 54.3945 1.52344C54.5247 1.48438 54.6484 1.45182 54.7656 1.42578C54.9089 1.38672 55.0521 1.35417 55.1953 1.32812C55.3385 1.30208 55.4688 1.28906 55.5859 1.28906C55.6901 1.28906 55.7878 1.30208 55.8789 1.32812C55.9701 1.34115 56.0286 1.38021 56.0547 1.44531C56.1328 1.51042 56.1654 1.64062 56.1523 1.83594C56.1523 2.03125 56.1393 2.23307 56.1133 2.44141C56.0612 2.6888 56.0026 2.95573 55.9375 3.24219C55.7812 3.80208 55.5664 4.60938 55.293 5.66406C55.0586 6.5625 54.7396 7.78646 54.3359 9.33594C53.9453 10.8854 53.4505 12.8385 52.8516 15.1953C52.7865 15.2604 52.7083 15.306 52.6172 15.332C52.526 15.3581 52.4414 15.3711 52.3633 15.3711C52.2721 15.3711 52.1745 15.3646 52.0703 15.3516C51.9792 15.3255 51.888 15.2865 51.7969 15.2344C51.7188 15.1823 51.6406 15.1107 51.5625 15.0195C51.4844 14.9414 51.4258 14.8307 51.3867 14.6875Z" fill="currentColor"/>
                                <path d="M61.1914 7.8125C61.3607 7.68229 61.5234 7.58464 61.6797 7.51953C61.849 7.44141 61.9987 7.38932 62.1289 7.36328C62.2721 7.32422 62.4154 7.3112 62.5586 7.32422C62.9102 7.35026 63.125 7.46094 63.2031 7.65625C63.2943 7.85156 63.3073 8.16406 63.2422 8.59375C63.2031 8.8151 63.125 9.09505 63.0078 9.43359C62.8906 9.77214 62.7539 10.1888 62.5977 10.6836C62.4414 11.1654 62.2721 11.7188 62.0898 12.3438C61.9206 12.9688 61.7578 13.6719 61.6016 14.4531C61.4453 15.0911 61.276 15.8268 61.0938 16.6602C60.9375 17.3893 60.7487 18.2682 60.5273 19.2969C60.319 20.3255 60.0911 21.5039 59.8438 22.832C59.7786 23.1576 59.6354 23.3464 59.4141 23.3984C59.2057 23.4505 58.9844 23.4245 58.75 23.3203C58.6589 23.2682 58.5742 23.2096 58.4961 23.1445C58.431 23.0794 58.3594 23.0013 58.2812 22.9102C58.2031 22.832 58.138 22.7214 58.0859 22.5781C58.3854 21.4844 58.6458 20.4883 58.8672 19.5898C59.1016 18.6914 59.3099 17.9102 59.4922 17.2461C59.6875 16.4779 59.8698 15.7878 60.0391 15.1758C60.1042 14.9023 60.1628 14.6354 60.2148 14.375C60.2799 14.1016 60.3451 13.8346 60.4102 13.5742C60.2409 13.8477 60.0586 14.1081 59.8633 14.3555C59.668 14.6029 59.4531 14.8177 59.2188 15C58.9844 15.1823 58.7305 15.319 58.457 15.4102C58.1966 15.5143 57.9232 15.5469 57.6367 15.5078C56.9336 15.4167 56.4323 15.1562 56.1328 14.7266C55.8464 14.2969 55.7227 13.737 55.7617 13.0469C55.7747 12.7734 55.8138 12.474 55.8789 12.1484C55.944 11.8229 56.0156 11.5104 56.0938 11.2109C56.1719 10.9115 56.2435 10.6445 56.3086 10.4102C56.3867 10.1628 56.4453 9.98698 56.4844 9.88281C56.6406 9.38802 56.7513 8.96484 56.8164 8.61328C56.8945 8.26172 56.8424 7.96875 56.6602 7.73438C56.8424 7.61719 57.0117 7.53906 57.168 7.5C57.3372 7.44792 57.487 7.40885 57.6172 7.38281C57.7604 7.36979 57.9036 7.36979 58.0469 7.38281C58.3984 7.4349 58.6003 7.5651 58.6523 7.77344C58.7174 7.98177 58.6979 8.29427 58.5938 8.71094C58.5417 8.93229 58.457 9.21875 58.3398 9.57031C58.2227 9.90885 58.099 10.2604 57.9688 10.625C57.8385 10.9896 57.7214 11.3281 57.6172 11.6406C57.513 11.9401 57.4544 12.1549 57.4414 12.2852C57.3242 12.8711 57.3177 13.3268 57.4219 13.6523C57.526 13.9648 57.7539 14.1211 58.1055 14.1211C58.2747 14.1211 58.4635 14.0495 58.6719 13.9062C58.8802 13.75 59.0885 13.5482 59.2969 13.3008C59.5182 13.0534 59.7331 12.7734 59.9414 12.4609C60.1497 12.1354 60.3385 11.8099 60.5078 11.4844C60.6901 11.1589 60.8464 10.8398 60.9766 10.5273C61.1198 10.2148 61.224 9.9349 61.2891 9.6875C61.3802 9.20573 61.4388 8.82812 61.4648 8.55469C61.4909 8.28125 61.3997 8.03385 61.1914 7.8125Z" fill="currentColor"/>
                                </svg>
                            </a>
                        </div>
                        <nav className="primaryNav">
                            <ul>
                                <li>
                                    <NavLink exact to={'/'}  activeClassName="active">
                                        <svg width="24" height="21" viewBox="0 0 24 21" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.38843 19.7391V13.4347H14.6058V19.7391C14.6058 20.4326 15.1927 21 15.9101 21H19.8231C20.5405 21 21.1275 20.4326 21.1275 19.7391V10.9129H23.3448C23.9448 10.9129 24.2318 10.1942 23.7753 9.81597L12.871 0.321525C12.3754 -0.107175 11.6188 -0.107175 11.1232 0.321525L0.218936 9.81597C-0.224539 10.1942 0.0493716 10.9129 0.649367 10.9129H2.86674V19.7391C2.86674 20.4326 3.45369 21 4.17108 21H8.08409C8.80148 21 9.38843 20.4326 9.38843 19.7391Z" fill="currentColor"/>
                                        </svg>
                                        <span>Home</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/messages-page'}  activeClassName="active">
                                        <svg width="24" height="25" viewBox="0 0 24 25" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21.6 0.399994C23 0.399994 24 1.49997 24 2.79999C24 4.10002 24 17.2 24 17.2C24 18.52 22.92 19.6 21.6 19.6H4.8L0 24.4V2.79999C0 1.47999 1.08 0.399994 2.4 0.399994C6.5 0.399994 20.2 0.399994 21.6 0.399994Z" fill="currentColor"/>
                                        </svg>
                                        <span>Messages</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/interests'}  activeClassName="active">
                                        <svg width="26" height="24" viewBox="0 0 26 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.60099 13.6216C2.73396 13.6216 0.411798 15.9438 0.411798 18.8108C0.411798 21.6778 2.73396 24 5.60099 24C8.46801 24 10.7902 21.6778 10.7902 18.8108C10.7902 15.9438 8.46801 13.6216 5.60099 13.6216ZM13.3588 14.9189V22.7027C13.3588 23.4162 13.9426 24 14.6561 24H22.4399C23.1534 24 23.7372 23.4162 23.7372 22.7027V14.9189C23.7372 14.2054 23.1534 13.6216 22.4399 13.6216H14.6561C13.9426 13.6216 13.3588 14.2054 13.3588 14.9189ZM4.44639 1.38811L0.165312 9.09405C-0.314688 9.96324 0.308014 11.027 1.29396 11.027H9.85612C10.8421 11.027 11.4648 9.96324 10.9848 9.09405L6.70369 1.38811C6.59137 1.18744 6.42759 1.02034 6.2292 0.904028C6.03082 0.787719 5.80501 0.726407 5.57504 0.726407C5.34508 0.726407 5.11927 0.787719 4.92088 0.904028C4.7225 1.02034 4.55871 1.18744 4.44639 1.38811ZM21.4669 0C20.0918 0 19.1188 0.726487 18.548 1.51784C17.9772 0.726487 17.0042 0 15.6291 0C13.6053 0 12.0615 1.66054 12.0615 3.56757C12.0615 5.94162 14.695 7.68 17.7048 10.2876C17.9398 10.4886 18.2388 10.599 18.548 10.599C18.8572 10.599 19.1563 10.4886 19.3913 10.2876C22.401 7.68 25.0345 5.94162 25.0345 3.56757C25.0345 1.66054 23.4907 0 21.4669 0Z" fill="currentColor"/>
                                        </svg>
                                        <span>Interests</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div> 
                    <nav className="secondaryNav">
                        <ul>
                            <li>
                                <NavLink to={'/settings'}  activeClassName="active">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20.5979 13.175C20.6479 12.8 20.6729 12.4125 20.6729 12C20.6729 11.6 20.6479 11.2 20.5854 10.825L23.1229 8.85C23.2323 8.75987 23.307 8.63462 23.3343 8.49559C23.3617 8.35655 23.34 8.21233 23.2729 8.0875L20.8729 3.9375C20.8023 3.81196 20.6894 3.71547 20.5545 3.66514C20.4195 3.61481 20.271 3.61387 20.1354 3.6625L17.1479 4.8625C16.5229 4.3875 15.8604 3.9875 15.1229 3.6875L14.6729 0.512503C14.6508 0.369416 14.5781 0.239013 14.468 0.144974C14.3579 0.0509351 14.2177 -0.000501881 14.0729 3.69175e-06H9.27293C8.97293 3.69175e-06 8.73543 0.212503 8.68543 0.512503L8.23543 3.6875C7.49793 3.9875 6.82293 4.4 6.21043 4.8625L3.22293 3.6625C2.94793 3.5625 2.63543 3.6625 2.48543 3.9375L0.0979288 8.0875C-0.0520712 8.35 -0.00207134 8.675 0.247929 8.85L2.78543 10.825C2.72293 11.2 2.67293 11.6125 2.67293 12C2.67293 12.3875 2.69793 12.8 2.76043 13.175L0.222929 15.15C0.113584 15.2401 0.0388708 15.3654 0.0115194 15.5044C-0.0158321 15.6435 0.00587035 15.7877 0.0729288 15.9125L2.47293 20.0625C2.62293 20.3375 2.93543 20.425 3.21043 20.3375L6.19793 19.1375C6.82293 19.6125 7.48543 20.0125 8.22293 20.3125L8.67293 23.4875C8.73543 23.7875 8.97293 24 9.27293 24H14.0729C14.3729 24 14.6229 23.7875 14.6604 23.4875L15.1104 20.3125C15.8479 20.0125 16.5229 19.6125 17.1354 19.1375L20.1229 20.3375C20.3979 20.4375 20.7104 20.3375 20.8604 20.0625L23.2604 15.9125C23.4104 15.6375 23.3479 15.325 23.1104 15.15L20.5979 13.175ZM11.6729 16.5C9.19793 16.5 7.17293 14.475 7.17293 12C7.17293 9.525 9.19793 7.5 11.6729 7.5C14.1479 7.5 16.1729 9.525 16.1729 12C16.1729 14.475 14.1479 16.5 11.6729 16.5Z" fill="currentColor"/>
                                    </svg>
                                    <span>
                                        <em>Settings</em>
                                        <a href="/settings">Edit profile</a>
                                        <a href="/geo-location">Geo Location</a>
                                        <a href="/logout" onClick={logoutUser}>Logout</a>
                                    </span>
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
    </header>
  )
}

export default NavBarSide