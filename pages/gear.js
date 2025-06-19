import Image from 'next/image';

const gears = [
  {
    image: '/gear/keyboard.png',
    text: 'Logitech MK470',
  },
  {
    image: '/gear/kulaklık.png',
    text: 'Anker SoundCore Life Q10',
  },
  {
    image: '/gear/monitor2.png',
    text: '32" Class Full HD IPS LED Monitor (31.5" Diagonal)',
  },
  {
    image: '/gear/monitor.png',
    text: 'Odyssey G3 24” 165 Hz Full HD (x2)',
  },
  {
    image: '/gear/mousepad.png',
    text: 'INCA EMPOUSA RGB 7 LED MOUSEPAD',
  },
  {
    image: '/gear/hop.png',
    text: 'Logitech Z313 980-000413 50W 2+1 Speaker',
  },
  {
    image: '/gear/soundcore.png',
    text: 'Anker Soundcore Motion B',
  },
  {
    image: '/gear/mic.png',
    text: 'Fifine T683 USB Microphone',
  },
];

const Gear = () => {
  return (
    <div className="py-16">
      <h1 className="text-2xl font-semibold mb-10 text-neutral-800 dark:text-neutral-100">
        Kullandığım Ekipmanlar
      </h1>

      <div className="grid gap-10 sm:grid-cols-2">
        {gears.map((gear, idx) => (
          <div key={idx} className="flex flex-col items-center text-center">
            <div className="relative w-full h-64 overflow-hidden">
              <Image
                src={gear.image}
                alt={gear.text}
                fill
                className="object-cover border border-neutral-300 dark:border-none rounded-xl"
              />
            </div>
            <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              {gear.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gear;
