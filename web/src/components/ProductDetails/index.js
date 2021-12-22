import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { useParams } from 'react-router-dom'

import React from 'react'
import './index.css'


const images = {
    1 : ["https://rukminim1.flixcart.com/image/800/960/kvr01ow0/watch/p/n/9/1-1793kl02-titan-men-original-imag8kvcuzres6fe.jpeg?q=50","https://rukminim1.flixcart.com/image/714/857/kvr01ow0/watch/r/l/c/1-1793kl02-titan-men-original-imag8kvczxrzwhzz.jpeg?q=50","https://rukminim1.flixcart.com/image/714/857/kvr01ow0/watch/k/d/x/1-1793kl02-titan-men-original-imag8kvcduczgzmc.jpeg?q=50"],
    2 : ["https://rukminim1.flixcart.com/image/416/416/kcnp8y80/headphone/x/t/d/i7s-tws-twins-wireless-ear-buds-mini-geminology-original-imaftqdfksgd2xhf.jpeg?q=70","https://rukminim1.flixcart.com/image/416/416/kbmjssw0/headphone/h/d/z/wireless-i7-bluetooth-headset-in-ear-earphone-with-inbuilt-mic-original-imafsxh6wyg9rf6n.jpeg?q=70","https://rukminim1.flixcart.com/image/416/416/ktuewsw0/headphone/l/i/l/i12-tws-earbud-stereo-bluetooth-headset-bluetooth-headset-white-original-imag73h3qghecrbe.jpeg?q=70"],
    3 : ["https://rukminim1.flixcart.com/image/714/857/jzygccw0/jacket/w/f/y/xxl-hljk000144-highlander-original-imafjv4evyrbx3fj.jpeg?q=50","https://rukminim1.flixcart.com/image/714/857/jzygccw0/jacket/w/f/y/xxl-hljk000144-highlander-original-imafjv4eegkujrz8.jpeg?q=50","https://rukminim1.flixcart.com/image/714/857/jzygccw0/jacket/w/f/y/xxl-hljk000144-highlander-original-imafjv4efjaq5qm4.jpeg?q=50"],
    4 : ["https://rukminim1.flixcart.com/image/416/416/kpft18w0/microphone/w/d/w/au-a04tr-maono-original-imag3zghjpfm8hrh.jpeg?q=70","https://rukminim1.flixcart.com/image/416/416/kpft18w0/microphone/s/d/g/au-a04tr-maono-original-imag3zghyyaasxch.jpeg?q=70","https://rukminim1.flixcart.com/image/416/416/kpft18w0/microphone/c/z/u/au-a04tr-maono-original-imag3zgh9avpv9h9.jpeg?q=70"],
    5 : ["https://rukminim1.flixcart.com/image/416/416/kjn6qvk0/gamepad/n/f/q/sony-dualsense-original-imafz66q8kv9nchz.jpeg?q=70","https://rukminim1.flixcart.com/image/416/416/kjn6qvk0/gamepad/n/f/q/sony-dualsense-original-imafz66qyhe75rxm.jpeg?q=70","https://rukminim1.flixcart.com/image/416/416/kjn6qvk0/gamepad/n/f/q/sony-dualsense-original-imafz66qbv6bnj87.jpeg?q=70"],
    6 : ["https://rukminim1.flixcart.com/image/416/416/kj1r53k0-0/massager/f/s/a/massage-gun-hf-280-cordless-handheld-deep-tissue-muscle-massager-original-imafypejjcffhmny.jpeg?q=70","https://rukminim1.flixcart.com/image/416/416/kksmikw0/massager/x/d/8/leg-hand-back-massager-leg-hand-back-massager-jmomc-original-imagy2a9f46kunjw.jpeg?q=70","https://rukminim1.flixcart.com/image/416/416/kklhbbk0/massager/x/o/d/home-kitchen-massager-gun-massage-gun-facial-massage-gun-original-imafzwrn5uytb7fq.jpeg?q=70"],
    7 : ["https://rukminim1.flixcart.com/image/416/416/km2clu80/tripod/tripod-kit/w/a/l/voice-recording-filter-mic-for-recording-singing-youtube-2in1-original-imagffz5auh3wnuq.jpeg?q=70","https://rukminim1.flixcart.com/image/416/416/km2clu80/tripod/tripod-kit/b/u/i/voice-recording-filter-mic-for-recording-singing-youtube-2in1-original-imagffz5zfehavdh.jpeg?q=70","https://rukminim1.flixcart.com/image/416/416/km2clu80/tripod/tripod-kit/u/3/h/voice-recording-filter-mic-for-recording-singing-youtube-2in1-original-imagffz5m4x9guz6.jpeg?q=70"],
    8 : ["https://rukminim1.flixcart.com/image/416/416/kuipea80/trimmer/x/r/k/0-5-18-mm-ng-1151-100-waterproof-stainless-steel-cordless-nova-original-imag7mnjhxfgzz2p.jpeg?q=70","https://rukminim1.flixcart.com/image/416/416/kulk9zk0/trimmer/z/s/o/0-5-18-mm-ng-1151-100-waterproof-stainless-steel-cordless-nova-original-imag7zjgsyudmzqa.jpeg?q=70","https://rukminim1.flixcart.com/image/416/416/k0zlsi80/trimmer/x/z/q/ng-1151-100-waterproof-nova-original-imafhzfn4wetgegb.jpeg?q=70"],
    9 : ["https://rukminim1.flixcart.com/image/800/960/kddf6a80/t-shirt/j/a/4/l-alteto-round-neck-plain-alteto-original-imafuahsqv5y9ngb.jpeg?q=50","https://rukminim1.flixcart.com/image/800/960/kddf6a80/t-shirt/u/s/u/xl-alteto-round-neck-plain-alteto-original-imafuahvapmgdg79.jpeg?q=50","https://rukminim1.flixcart.com/image/714/857/kddf6a80/t-shirt/v/i/2/l-alteto-round-neck-plain-alteto-original-imafuahs8y3byxqz.jpeg?q=50"]

}



function ProductDetails() {
    // const {match} = props 
    // const {params} = match
    // const {productName} = params
    const {id}  = useParams()
    console.log(id)
    return (
        <Carousel thumbWidth={100} showIndicators={true}  stopOnHover infiniteLoop autoPlay={false} showArrows interval={2000}>
            {images[id].map(each => <img
          src={each}
          alt="clothes that get you noticed"
          className="carousel-image"
        />)}
            
        {/* <img
          src="https://rukminim1.flixcart.com/image/452/542/kpodocw0/watch/p/l/t/anlg-428-blue-blu-analogue-original-imag3uxbhfkyhahf.jpeg?q=50"
          alt="clothes that get you noticed"
          className="carousel-image"
        />
        <img
          src="https://rukminim1.flixcart.com/image/452/542/kuwzssw0/watch/q/z/s/1-ls2820-limestone-men-original-imag7xhe6m4sccax.jpeg?q=50"
          alt="clothes that get you noticed"
          className="carousel-image"
        /> */}
        </Carousel>
    )
}

export default ProductDetails
