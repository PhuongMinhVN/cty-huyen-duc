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
        const src = img ? img.src : (video ? video.src : null);

        if (!src) {
          resolve(false);
          return;
        }

        // Tạo timeout chung: Nếu sau 3 giây không kiểm tra xong, mặc định giữ lại slide (resolve true) để tránh xóa nhầm do mạng chậm
        const fallbackTimer = setTimeout(() => {
          resolve(true);
        }, 3000);

        fetch(src, { method: 'HEAD' })
          .then(response => {
            clearTimeout(fallbackTimer);
            resolve(response.ok);
          })
          .catch(() => {
            // Nếu fetch bị lỗi, dùng Image/Video để thử lại
            if (img) {
              const tempImg = new Image();
              tempImg.onload = () => { clearTimeout(fallbackTimer); resolve(true); };
              tempImg.onerror = () => { clearTimeout(fallbackTimer); resolve(false); };
              tempImg.src = src;
            } else if (video) {
              const tempVideo = document.createElement('video');
              tempVideo.onloadedmetadata = () => { clearTimeout(fallbackTimer); resolve(true); };
              tempVideo.onerror = () => { clearTimeout(fallbackTimer); resolve(false); };
              tempVideo.src = src;
            }
          });
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
