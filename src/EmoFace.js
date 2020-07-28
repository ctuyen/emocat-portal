import React, { useState, useRef } from 'react';
import './styles/EmoFace.css';
import smile from './smile.svg';
import sad from './sad.svg';
import happy from './happy.svg';
import respondFace from './undraw_respond_8wjt.svg';

function EmoFace() {
  const [emo, setEmo] = useState('toStart'), [imgClass, setImgClass] = useState(''), [info, setInfo] = useState('HEY!  I\'m Emo Cat');
  const imgRef = useRef(null);

  document.onkeydown = (e) => {
    if (e.code !== 'Space' || e.isComposing || e.keyCode === 229) {
      return;
    };

    handleNextStep(emo);
  };

  const handleNextStep = (emotion) => {
    switch (emotion) {
      case 'sad': {
        setImgClass('fadeOut');
        setInfo('PROCESSING...')
        setTimeout(() => {
          imgRef.current.src = sad;
          setImgClass('fadeIn');
          setInfo('DISAPPOINTED!');
          setEmo('toSmile');
        }, 1000)
        break;
      }
      case 'smile': {
        setImgClass('fadeOut');
        setInfo('PROCESSING...');
        setTimeout(() => {
          imgRef.current.src = happy;
          setImgClass('fadeIn');
          setInfo('SATISFIED!');
          setEmo('toSad');
        }, 1000)
        break;
      }
      default: {
        setImgClass('fadeOutUp');
        setInfo('LISTENING...');
        setTimeout(() => {
          imgRef.current.src = respondFace;
          setImgClass('fadeIn');
        }, 2000)
        if (emo === 'toStart') setEmo('smile');
        if (emo === 'toSad') setEmo('sad');
        if (emo === 'toSmile') setEmo('smile');
      }
    }
  }
  return (
    <div>
      <div className="flex justify-center mt-20">
        <img ref={imgRef} className={`${imgClass} w-1/2 md:w-1/4`} src={respondFace} alt="" />
      </div>

      <div tabIndex={-1} className={'flex justify-center absolute w-full text-5xl'} style={{ position: 'absolute', bottom: '6rem' }} onClick={() => handleNextStep(emo)}>
        <span className={`${emo === 'toSmile' ? 'text-red-600 ' : ''}${emo === 'toSad' ? 'text-green-600 ' : ''} mx-16 leading-loose`}>{info}</span>
        {info.includes('LISTENING') && <img className={`inline-block recording`} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAABF0lEQVR4nO3ZTa4BYRBAUcTUImzPgmzPIiyAkTAj3fq7fs6ZmSjJTXn12moFAAAAwL9YV4P3x/Pl8fXpsBv6Wer5N5tiKHcCxASICRATICZATICYADEBYgLEBIhtl3rj+llLPf9VNiAmQEyAmAAxAWKLXUFz1VfMqPk2ICZATICYADEBYpOvoPpK+RU2ICZATICYADEBYh/7LOiZ+gp713wbEBMgJkBMgJgAMQFiAsQEiAkQEyAmQEyAmACxr30aWv8G/a75NiAmQEyA2OS/AfV38K+wATEBYgLEBIgJEPvY/4TrK2vUfBsQEyAmQEyAmACxxa6gf7li5rIBMQFiAsQEiAkQEyAmQEyAmAAxAWICAAAAAMAgV6+VLgF7uz9jAAAAAElFTkSuQmCC" />}
        {info.includes('HEY') && <img style={{ width: '90px' }} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAANOklEQVR4nO2baWxc13XHf/e+NwtnJYfDneKIokRqh01Zi5XIruQAaYq2QJ00CZC0jpMPtiEpLdy0QD8U5ZfCCGQphZ0EReJYsl24QRYkQKsPiWNHiBfFS2I7shbb2kiRtEQOd3I4y3vv9MNwFbc3M6wsoPl/4eDee/73nPPues4l/BH/v6FWi+jxQ8c3Av+loE5EfT+cyzz20PceSq0WP8CRbzwb1Gnrn1H6IUQ+UvClR7/94JlSOFfFAR0dP/JGByd/5zjO1jnFXeI4X/rGd7/2ymr0ceTQ0wcMrZ4Xh5o5xWfH4sH2jo7PZ4vl1augG6H+8b91HGdrKBbhzvv3EopHLaBJaf3i0cPHv1oq/7HDTx8y0L8Uh5pITTntn/skoVjYBraEBya+XAr3qjjA9Jh/B5DY1Up5fZydn7/HbLpzPYAX4aljB59+oFjuxw8dPyyinhQlRvOuNto/t49obYzErjYDAIevlaJ7yQ54/NDxjbZlbzX9XuLNU6NTK1o+sZnWe7cBKFHq+0cPnrivUO5jB5/5KwX/jlJsuq+dtbvaUCo/a6vW1WL6vDaKvUcOPdtcrP4lO0DDAYCKNXG0Ycyra9jWTOKuVgAPSo4/cfg/I255jzz8bLVo+R6gW/ZuonZj47x6pTXljTEDQCv73mL1N4sVnIYIO1EQiUcXrV+3q43h7iQj1wfX5CT3o6MHj/egaAEagQrADwhKTSIMI841lLoIdhtCPN5Sy9R0WoDyukqSl66DqB3AiWL0L9kBSrFJgFB1+YK64Z4BPjrfSWpobLro00vuOyJBII5S64H9AIZpSuu+bUvuVKHKqQGlZFOx+pfsABRrEQiUBxdUnTn5BlY2B4C/PEiouoJQVRR/JIgvHECbJqbXRMTBzjk4uRyZiTTpkQkmh8eJ1MWUbZjkcjamaaBucoU36M//EJUoVv2SHNDR0aElqSpBMLyzVOII2ZxD4u7NZFNpypuq8UcWOmgaSmlMnwafiTdURrimYqbOcYRM1iabdTBNjdejSQ2N4ThCWbhsqkOpWYJ6RZS0CEaHExEQE8D0miCQzdqkJnPkLJvYujpqtzYva7xbCELOynO//fPXeOvHv6H3fBdaKUERfuLwE75ieEtygJU2vADaNADNZMYim7ORUkhXgAA1mxMgwqVXz+GIKIBUxucvhq8kBziejBfA9Bqk0jls2ymFzjXqtrewfn872phV39Blt34EmHgOANiW4Nwi46dRkaim5UA7SudXRsOwPlMMT9EO+OahH9QreBJgzc7ZE9qtRHljnKbd+R1QtHry2MPPNBTKUbQDTNH/JiKR8kQNVa2NKwv8H6F6YxPla6pBCONxHitUvqjP9q2/f67Ose0uhTK3fXYfvuntaA6yE2m63jjPaPcAAJH6GI0721zvCIXIp0dSvPezV0DExlKJR//jgR63thQ1AmzbehARs7ypaknjz/78VYau3sC2LGzLYqirj/P/c5rsRHpF/kLl/dEAsZY6BDHEdAq6fhsrN5mPjo4OXZaJPS8ikcTdm/GFAwvaXHn1DKmBUcobq2j7093UbllLZmSc1NA4uYk0sebaZfsoRt70e0l+2IPSeuPdn7njW6dOnXK1Gxc8AqJ969oc22nwBvxEaisXbTM9bBN7t+AN+vAG/ST25oNFIz3JFfsoRj5cXYE36Eccpy7Sv9b13aDgo7Boaw+o/OVniRUkUBlGmHNWn/odrqlwdUgqSl5BpC5G8mIvomU3cNaNPYU7QNRuFASrFt7+prHxz3YXVL5a8qGqCpIXe1Eiu4Gn3fRV+CKo2AoQjLuObdwy+KL59UhQW9zKFHEblBgoTJ+3cNEpjF4f5OrLZ8iMT84r94XKaN63jXBtrChe/8yCLK4JitgGVQWA6fcULjqFrt+eX2A8QGZ8kq7XLxTNqz3TOqml5+dNKCYeUA5geIt3wDTafTbbPTYAf8gZ/D5T8K48D9ozI1+xXLt5MkX0U/Khf81d+bvD2xmDbkvTY2nezhgopWjc0Vo8sTNzIXN9Iy/GAUMAVrroZAzRxjj17esR4KW0yYtpEwHq29cTbYwXzWtlctM/h93KFOOAMwCpwdEiRGdRv62FWHMdDuAAseY66re1lMSZGpjRyXW+sBgHvAww3Nm34hB472evcu6/T2NncwsrVf4MP42yaHDRyWVnLd7/xZtcfnllmwav3Jg+JrrORxbsAG3yHOAMXOpVucnM0g0FlIaJ5AjnT77BcHcSx7JxLJuJgVGunj5L77uX8kYr6Hn3Ip2nz5EaGJ1pN9yd5PzJ1xntHSAztnyiOTeZZfBKbwgQW6nn3dpT1IJ29NDxHwJfiK9vsJr3bVtyJ8mm0rz/izdJD08sWq+1omnvFpTA1dPnEGfxqFJZeYjWT9+FN7B02O/SS+/0D3Zer1KifvLod77y125tKS4srpzHEP2F5MUeM1gVpXpj06LNvAE/W/7yE9w418ng5V7SY5Ng25hlPqINcWq3zUaMQzUxrr93hZGefqzJDBgG/kiAynV1VG9KzIv/3Yy+813pwc7rVXnd7G8WZEohjSH/FiCcnHgN2JEnUFK/Y72q39ayis8t3KPvwjWr6/Q5JYgBIPCOV43t+fqTX19mfs6i4DUgPDDxALAjqoXtHhtBVM/vPuSDF95acZ6uJqx0lsun3sl2nj5rCmJs9NjEtKDgjqwT+hu3PIVPAYd7UbDdY9Picag0hFfSBiM9Sc789GViLfXUb2+Zt8KvJqx0lr73r3H9zBXLzlleD7DHZ9HicbhqCafSJlqre4Cn3PAVfh1WjCngQs6gwXRImA7xgPBG1qDT0gxc7GHwUi/BqnJia2spb6peNGxWCDJjKUa6+xm+1s9o7wAiAmAmTIedPpuQEjKiuJDLD2hBjbvlLmjW5h8p2VeAKoCggrt9Fo1mfvUecBTvZQ26LI09R84b8BOsilJWEcIXLMMb8uMNlWH6fBheA0RmkqPZVJrM+CTZsUkmkiNMDIyQnZidzgbQZDps9dpU6vyJt9fWvJY2GJcpc5RK+u2J5oPfPbiiIwoaATptPQKqKlRdDgLj/cP8Km3SZDrs8uUVutdvkRbotDXdOc1HjiabSpPtTDPUeaOQ7mZgINQYQpMprDVt/FN2jori9xmDq1b+y4drY4jjMN43HM8YgUeAIytxu3aAIOoYJx4BaLhzA+G6Cm6c7aL37Yt0WRbdliZhOmz02NQYQpvp0GY6OMCwrUg6ilHRTDowIYpJyf+1ZFaRgBL8WvArCCiIaqFSC5WGMy96229rzuY0nbZGBAyPSUP7Bmo2NTHcM8CHL7yFCA8L8rhCLXsxcj0Fjh4+vgfhtC9cxvbP3jsjmU2l6X7rAwYvX0ckPxXKtbDGdGgwhKqblL8ZJ8bzgZWvhJY+WdtAv63otTRXbM2Yk+9cG5qqtjXUbV+HZzo1KPDuj0+RnUjjiOz5x+989fXl7HI/AhzuVwoqErXz3OYN+Fl3z3Yad7TSf+EafR9cYzidZThrcIb8nK3QDnFDiGoIKyGkBa8SfHPSaTaKjAMZYMJRDItixFYMOTAkGnvOd/QG/VS1raGqtXHW8GkoqFhbw42znWjF/cDqOEApdgGE6xYPhXuDfhp2bKC+vYXxvhFGe5OM9A6Q6h8l6UByhdzpc+NLB1i0VoTiUUI1FcQSNQSqosvmIiN1ldw424lC7VrRrpUaQD4ZEu5PDKMI3/HFA3jK3McD7WyOieQombEUkyMTZMZSpAZGl8wQeYN+yirC+MIB/OEAgXiEYDy67FH4ZuQmM7zzw18DjI7FOys6OjqWdL+rERBKJlpRhL1Bf0HGQz50FqmvBGZHzuXf/IGBS72sbc6x/1P50+OvXwxy9bJJpD5O8ye3LsHmDp4yH96An2wqHQkMJlqAD5dq68qtCtUKUFYRLkmxaYxc6wfgT+6bJBgSgiFh/315R4x0969KH/6pR1uGLW3LtXM3rkTWw9ywc2mQZUN2q/PAZjaLrBZ/ZDgFdw7QeRJfZHUcEK3Px/1e+lWA8THN+JjmpRfyx+VwXfExwbmY0VWzrAPc7QLiNIDCFyzqHdICNNzVymjvAF1X4cRTsxkm0+dhzY4Nq9KHLzT9hI5lX424XFpVNYBZ4AK4FPzhAJv+Yg8ViRpMn4np9RBbW8vmP9+DN1TaxWkaHv+UrkL1cu3cngNqAMziHmItCn8kyPoDd64a382Y/lhK5S9uS8Ht5hoF8KxCNuhWwZhKk8lUJmspuB0BPgClFedP/hal1LxU9fmTr6MUt1XZhk+1z9O9VAd4AZShGe9bmHQZ7xu67crm/O/Csiu3Wwd4ALJzHkOOLZITuJ3KcjKj67Ird0EBkaxlUxaPcvO79UBV+YLjy8ddlsnZuIGry9DRQ8cFYOMX97sivV1wIX8h4h++/eCSdrrdBa4DZIZcxxo/dqRndf1ouXYup4A8C+qfrvzyTQxP6f9kcitg5ywAFDyzXDtX1ozFQ/8STo6DqC/bWat+FfS7FehF8dxoZfBfP25F/ojbGf8LMJUoE8NgR5kAAAAASUVORK5CYII=" />}
      </div>
    </div>
  )
}

export default EmoFace;
