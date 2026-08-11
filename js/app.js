/**
 * HUYỀN ĐỨC CO., LTD. - CLEAN LANDING PAGE SCRIPTS
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sao chép địa chỉ công ty
  window.copyAddress = () => {
    const address = "Khu công nghiệp Trung Sơn, Phường Trung Sơn, Thành phố Tam Điệp, Tỉnh Ninh Bình";
    navigator.clipboard.writeText(address).then(() => {
      showToast('Đã sao chép địa chỉ KCN Trung Sơn, Tam Điệp!');
    }).catch(() => {
      showToast('Địa chỉ: KCN Trung Sơn, TP. Tam Điệp, Ninh Bình');
    });
  };

  // 2. Hiển thị Toast thông báo ngắn gọn
  const toast = document.getElementById('toastMsg');
  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.style.display = 'block';
    setTimeout(() => {
      toast.style.display = 'none';
    }, 3500);
  };

  // 3. Xử lý gửi Form liên hệ
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      showToast(`Cảm ơn ${name}! Huyền Đức sẽ liên hệ trong ít phút.`);
      contactForm.reset();
    });
  }

  // 4. Khởi tạo Swiper cho thư viện ảnh
  const gallerySwiperEl = document.querySelector('.gallerySwiper');
  if (gallerySwiperEl) {
    // Khởi tạo Swiper trực tiếp để đảm bảo luôn hoạt động ổn định 100%
    new Swiper('.gallerySwiper', {
      slidesPerView: 3,
      spaceBetween: 24,
      slidesPerGroup: 1, // Cuộn từng ảnh một để loop mượt mà
      loop: true, // Vòng lặp liên tục
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 16,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 24,
        }
      }
    });
  }
});
