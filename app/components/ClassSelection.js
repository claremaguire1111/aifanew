'use client';

export default function ClassSelection({ onSelectClass }) {
  // Example subjects with either emojis or images
  const subjects = [
    { id: 'Art', label: 'Art', emoji: '🎨' },
    { id: 'Music', label: 'Music', emoji: '🎵' },
    { id: 'History', label: 'History', emoji: '🏛️' },
    { id: 'Geography', label: 'Geography', emoji: '🗺️' },
    { id: 'Psychology', label: 'Psychology', emoji: '🧠' },
    { id: 'Business', label: 'Business', emoji: '💼' },
    { id: 'Fashion', label: 'Fashion', emoji: '👗' },
    { id: 'Beauty', label: 'Beauty', emoji: '💄' },
    { id: 'Science', label: 'Science', emoji: '🔬' },
    { id: 'Fitness', label: 'Fitness', emoji: '🏋️' },
    // add more if you want
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-8">
        Welcome to Class
      </h1>
      <p className="text-center mb-6 text-lg">
        Ready to get inspired? Pick a class below!
      </p>

      {/* Circle Buttons */}
      <div className="flex flex-wrap justify-center gap-6">
        {subjects.map((subj) => (
          <button
            key={subj.id}
            onClick={() => onSelectClass(subj.id)}
            className="bg-white/10 hover:bg-white/20 text-white 
                       w-24 h-24 rounded-full flex flex-col 
                       items-center justify-center text-xl 
                       font-semibold transition 
                       shadow hover:shadow-lg"
          >
            <span className="text-3xl">{subj.emoji}</span>
            <span className="text-sm mt-1">{subj.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
