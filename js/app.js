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
    const slides = Array.from(gallerySwiperEl.querySelectorAll('.swiper-slide'));

    // Hàm kiểm tra sự tồn tại của ảnh hoặc video
    const checkMedia = (slide) => {
      return new Promise((resolve) => {
        const img = slide.querySelector('img');
        const video = slide.querySelector('video');

        if (img) {
          // Nếu ảnh đã tải xong (dù thành công hay thất bại)
          if (img.complete) {
            resolve(img.naturalWidth > 0);
            return;
          }
          // Lắng nghe sự kiện tải ảnh
          img.addEventListener('load', () => resolve(true));
          img.addEventListener('error', () => resolve(false));
          // Timeout sau 3 giây để tránh chờ đợi lâu
          setTimeout(() => resolve(false), 3000);
        } else if (video) {
          // Lắng nghe sự kiện tải video
          if (video.readyState >= 1) {
            resolve(true);
            return;
          }
          video.addEventListener('loadedmetadata', () => resolve(true));
          video.addEventListener('error', () => resolve(false));
          // Timeout sau 3 giây
          setTimeout(() => resolve(false), 3000);
        } else {
          // Slide không có ảnh hoặc video
          resolve(false);
        }
      });
    };

    // Kiểm tra tất cả slide song song
    Promise.all(slides.map(slide => checkMedia(slide).then(isValid => ({ slide, isValid }))))
      .then(results => {
        let validSlidesCount = 0;
        results.forEach(({ slide, isValid }) => {
          if (!isValid) {
            slide.remove();
          } else {
            validSlidesCount++;
          }
        });

        // Chỉ khởi tạo Swiper nếu có ít nhất 1 slide hợp lệ
        if (validSlidesCount > 0) {
          new Swiper('.gallerySwiper', {
            slidesPerView: 3,
            spaceBetween: 24,
            slidesPerGroup: 1, // Cuộn từng ảnh một để loop chạy mượt mà và liên tục
            loop: validSlidesCount > 1, // Chỉ bật loop khi có nhiều hơn 1 slide
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
  }
});
