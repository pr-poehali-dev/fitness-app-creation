import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const mockUser = {
  name: 'Александра Петрова',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alexandra',
  rank: 42,
  points: 8450,
  streak: 12,
  todayCalories: 1850,
  targetCalories: 2000,
  todayWorkout: true
};

const mockFeed = [
  {
    id: 1,
    user: { name: 'Михаил Соколов', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael', rank: 15 },
    achievement: 'Пробежал марафон за 3:45:12',
    type: 'running',
    points: 500,
    likes: 234,
    comments: 18,
    time: '2 часа назад'
  },
  {
    id: 2,
    user: { name: 'Елена Волкова', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena', rank: 8 },
    achievement: 'Новый личный рекорд: жим 85кг',
    type: 'strength',
    points: 350,
    likes: 189,
    comments: 12,
    time: '4 часа назад'
  },
  {
    id: 3,
    user: { name: 'Дмитрий Иванов', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dmitry', rank: 23 },
    achievement: '30-дневная серия тренировок',
    type: 'streak',
    points: 600,
    likes: 567,
    comments: 45,
    time: '6 часов назад'
  }
];

const workoutPrograms = [
  { name: 'Сила и масса', progress: 65, sessions: '12/20' },
  { name: 'Кардио выносливость', progress: 80, sessions: '16/20' },
  { name: 'Гибкость', progress: 40, sessions: '8/20' }
];

const workoutDetails = [
  {
    name: 'Утренняя пробежка',
    duration: '45 мин',
    image: 'https://cdn.poehali.dev/projects/ed78dddc-0db3-4810-938d-01c433851763/files/216efa55-9aa0-4b3d-bf84-85235877daa4.jpg',
    video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    description: 'Начни день с легкой пробежки. Разминка 5 мин, основная часть 35 мин в комфортном темпе, заминка 5 мин.',
    steps: ['Разминка суставов', 'Легкий бег трусцой', 'Постепенное увеличение темпа', 'Заминка и растяжка']
  },
  {
    name: 'Силовая тренировка',
    duration: '60 мин',
    image: 'https://cdn.poehali.dev/projects/ed78dddc-0db3-4810-938d-01c433851763/files/e9cd8ac8-f0bc-4a4e-a015-ca0ad7ac9911.jpg',
    video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    description: 'Комплексная тренировка на все группы мышц. 3 подхода по 12 повторений на каждое упражнение.',
    steps: ['Приседания со штангой', 'Жим лежа', 'Становая тяга', 'Подтягивания', 'Жим гантелей']
  },
  {
    name: 'Йога и растяжка',
    duration: '40 мин',
    image: 'https://cdn.poehali.dev/projects/ed78dddc-0db3-4810-938d-01c433851763/files/4a603972-a3d4-45f9-ad5c-54c421ee664d.jpg',
    video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    description: 'Восстанавливающая практика для гибкости и релаксации. Плавные переходы между асанами.',
    steps: ['Приветствие солнцу', 'Поза воина', 'Собака мордой вниз', 'Поза дерева', 'Шавасана']
  },
  {
    name: 'HIIT кардио',
    duration: '30 мин',
    image: 'https://cdn.poehali.dev/projects/ed78dddc-0db3-4810-938d-01c433851763/files/216efa55-9aa0-4b3d-bf84-85235877daa4.jpg',
    video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    description: 'Высокоинтенсивная интервальная тренировка. 30 сек работы, 15 сек отдыха, 8 раундов.',
    steps: ['Берпи', 'Прыжки с выпадами', 'Скалолаз', 'Прыжки на скакалке', 'Планка с касаниями']
  },
  {
    name: 'Плавание',
    duration: '45 мин',
    image: 'https://cdn.poehali.dev/projects/ed78dddc-0db3-4810-938d-01c433851763/files/e9cd8ac8-f0bc-4a4e-a015-ca0ad7ac9911.jpg',
    video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    description: 'Кардио-тренировка в бассейне. Чередование стилей плавания для равномерной нагрузки.',
    steps: ['Разминка вольным стилем', 'Кроль 400м', 'Брасс 200м', 'На спине 200м', 'Заминка']
  },
  {
    name: 'Функциональный тренинг',
    duration: '50 мин',
    image: 'https://cdn.poehali.dev/projects/ed78dddc-0db3-4810-938d-01c433851763/files/4a603972-a3d4-45f9-ad5c-54c421ee664d.jpg',
    video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    description: 'Развитие силы, выносливости и координации через комплексные движения.',
    steps: ['Приседания с прыжком', 'Отжимания', 'Махи гирей', 'Выпады с весом', 'Планка с движением']
  }
];

export default function Index() {
  const [activeTab, setActiveTab] = useState('feed');
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [selectedWorkout, setSelectedWorkout] = useState<number | null>(null);

  const toggleLike = (postId: number) => {
    setLikedPosts(prev => 
      prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
    );
  };

  const getActivityIcon = (type: string) => {
    switch(type) {
      case 'running': return 'Footprints';
      case 'strength': return 'Dumbbell';
      case 'streak': return 'Flame';
      default: return 'Activity';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 pb-20">
      <div className="container max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <Avatar className="h-12 w-12 sm:h-16 sm:w-16 border-2 sm:border-4 border-white shadow-lg">
                <AvatarImage src={mockUser.avatar} />
                <AvatarFallback>АП</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  {mockUser.name}
                </h1>
                <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
                  <Badge variant="secondary" className="bg-gradient-to-r from-primary to-secondary text-white text-xs sm:text-sm">
                    #{mockUser.rank} в мире
                  </Badge>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:flex items-center gap-1">
                    <Icon name="Trophy" size={14} />
                    {mockUser.points} pts
                  </span>
                </div>
              </div>
            </div>
            <Button size="icon" variant="ghost">
              <Icon name="Settings" size={20} />
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <Card className="p-4 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-3">
                <div className="p-2 sm:p-3 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl sm:rounded-2xl">
                  <Icon name="Flame" size={20} className="text-white sm:w-6 sm:h-6" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-xs sm:text-sm text-muted-foreground">Серия</p>
                  <p className="text-lg sm:text-2xl font-bold">{mockUser.streak}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-3">
                <div className="p-2 sm:p-3 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl sm:rounded-2xl">
                  <Icon name="Utensils" size={20} className="text-white sm:w-6 sm:h-6" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-xs sm:text-sm text-muted-foreground">Ккал</p>
                  <p className="text-lg sm:text-2xl font-bold">{mockUser.todayCalories}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-3">
                <div className="p-2 sm:p-3 bg-gradient-to-br from-pink-400 to-pink-600 rounded-xl sm:rounded-2xl">
                  <Icon name="Dumbbell" size={24} className="text-white" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-xs sm:text-sm text-muted-foreground">Спорт</p>
                  <p className="text-lg sm:text-2xl font-bold">
                    {mockUser.todayWorkout ? '✓' : '—'}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4 sm:mb-6 bg-white/80 backdrop-blur-sm p-1 h-auto sticky top-0 z-10">
            <TabsTrigger value="feed" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white py-2 sm:py-3">
              <Icon name="Rss" size={18} className="sm:mr-2" />
              <span className="hidden sm:inline">Лента</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white py-2 sm:py-3">
              <Icon name="User" size={18} className="sm:mr-2" />
              <span className="hidden sm:inline">Профиль</span>
            </TabsTrigger>
            <TabsTrigger value="workouts" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white py-2 sm:py-3">
              <Icon name="Dumbbell" size={18} className="sm:mr-2" />
              <span className="hidden sm:inline">Тренировки</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h2 className="text-base sm:text-xl font-bold">Рейтинг достижений</h2>
              <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                <Icon name="TrendingUp" size={16} className="mr-2" />
                Топ-100
              </Button>
            </div>

            {mockFeed.map((post) => (
              <Card key={post.id} className="p-4 sm:p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up">
                <div className="flex items-start gap-3 sm:gap-4">
                  <Avatar className="h-10 w-10 sm:h-12 sm:w-12 border-2 border-primary/20">
                    <AvatarImage src={post.user.avatar} />
                    <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-2 flex-wrap">
                      <span className="font-semibold text-sm sm:text-base">{post.user.name}</span>
                      <Badge variant="outline" className="text-xs">#{post.user.rank}</Badge>
                      <span className="text-xs sm:text-sm text-muted-foreground">• {post.time}</span>
                    </div>
                    
                    <div className="flex items-start gap-2 sm:gap-3 mb-3">
                      <div className="p-2 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg">
                        <Icon name={getActivityIcon(post.type)} size={20} className="text-primary" />
                      </div>
                      <p className="text-sm sm:text-lg">{post.achievement}</p>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 border-0">
                        <Icon name="Zap" size={12} className="mr-1" />
                        +{post.points} pts
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 sm:gap-6 text-sm text-muted-foreground">
                      <button 
                        onClick={() => toggleLike(post.id)}
                        className="flex items-center gap-2 hover:text-pink-500 transition-colors"
                      >
                        <Icon 
                          name="Heart" 
                          size={18} 
                          className={likedPosts.includes(post.id) ? 'fill-pink-500 text-pink-500' : ''} 
                        />
                        <span>{post.likes + (likedPosts.includes(post.id) ? 1 : 0)}</span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-primary transition-colors">
                        <Icon name="MessageCircle" size={18} />
                        <span>{post.comments}</span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-primary transition-colors">
                        <Icon name="Share2" size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="profile" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <Card className="p-4 sm:p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 flex items-center gap-2">
                  <Icon name="TrendingUp" size={18} className="text-primary sm:w-5 sm:h-5" />
                  Прогресс
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Калории сегодня</span>
                      <span className="text-sm font-semibold">{mockUser.todayCalories}/{mockUser.targetCalories}</span>
                    </div>
                    <Progress value={(mockUser.todayCalories / mockUser.targetCalories) * 100} className="h-3" />
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm sm:text-base font-semibold">Программы тренировок</span>
                      <Badge variant="outline" className="text-xs">3 активных</Badge>
                    </div>
                    {workoutPrograms.map((program, index) => (
                      <div key={index} className="mb-4 last:mb-0">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm">{program.name}</span>
                          <span className="text-sm text-muted-foreground">{program.sessions}</span>
                        </div>
                        <Progress value={program.progress} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              <Card className="p-4 sm:p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 flex items-center gap-2">
                  <Icon name="Utensils" size={18} className="text-primary sm:w-5 sm:h-5" />
                  План питания
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  <div className="p-2.5 sm:p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm sm:text-base font-medium">Завтрак</span>
                      <span className="text-xs sm:text-sm text-muted-foreground">450 ккал</span>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">Овсянка, фрукты, орехи</p>
                  </div>
                  <div className="p-2.5 sm:p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm sm:text-base font-medium">Обед</span>
                      <span className="text-sm text-muted-foreground">650 ккал</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Курица, рис, овощи</p>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm sm:text-base font-medium">Ужин</span>
                      <span className="text-sm text-muted-foreground">550 ккал</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Рыба, киноа, салат</p>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm sm:text-base font-medium">Перекусы</span>
                      <span className="text-sm text-muted-foreground">200 ккал</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Фрукты, йогурт</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="workouts" className="animate-fade-in">
            {selectedWorkout === null ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {workoutDetails.map((workout, index) => (
                  <Card key={index} className="overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group" onClick={() => setSelectedWorkout(index)}>
                    <div className="relative h-40 sm:h-48 overflow-hidden">
                      <img 
                        src={workout.image} 
                        alt={workout.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <Badge variant="outline" className="absolute top-3 right-3 bg-white/90 text-xs">{workout.duration}</Badge>
                    </div>
                    <div className="p-4 sm:p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`p-2 bg-gradient-to-br ${
                          index % 3 === 0 ? 'from-purple-400 to-purple-600' :
                          index % 3 === 1 ? 'from-pink-400 to-pink-600' :
                          'from-orange-400 to-orange-600'
                        } rounded-lg`}>
                          <Icon name="Dumbbell" size={16} className="text-white" />
                        </div>
                        <h3 className="font-bold text-sm sm:text-base">{workout.name}</h3>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-3 line-clamp-2">{workout.description}</p>
                      <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
                        Подробнее
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="animate-fade-in">
                <Button variant="ghost" className="mb-4" onClick={() => setSelectedWorkout(null)}>
                  <Icon name="ArrowLeft" size={18} className="mr-2" />
                  Назад к тренировкам
                </Button>
                
                <Card className="overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <div className="relative h-64 sm:h-80 overflow-hidden">
                    <img 
                      src={workoutDetails[selectedWorkout].image} 
                      alt={workoutDetails[selectedWorkout].name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <h2 className="absolute bottom-4 left-4 sm:left-6 text-2xl sm:text-3xl font-bold text-white">
                      {workoutDetails[selectedWorkout].name}
                    </h2>
                  </div>
                  
                  <div className="p-4 sm:p-6 space-y-6">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Icon name="Info" size={20} className="text-primary" />
                        <h3 className="text-lg font-bold">Описание</h3>
                      </div>
                      <p className="text-sm sm:text-base text-muted-foreground">{workoutDetails[selectedWorkout].description}</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Icon name="ListChecks" size={20} className="text-primary" />
                        <h3 className="text-lg font-bold">Программа тренировки</h3>
                      </div>
                      <ul className="space-y-2">
                        {workoutDetails[selectedWorkout].steps.map((step, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm sm:text-base">
                            <div className="mt-1 p-1 bg-gradient-to-br from-primary to-secondary rounded-full">
                              <Icon name="Check" size={14} className="text-white" />
                            </div>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Icon name="Video" size={20} className="text-primary" />
                        <h3 className="text-lg font-bold">Видео инструкция</h3>
                      </div>
                      <a 
                        href={workoutDetails[selectedWorkout].video}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <Card className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/20 hover:border-primary/40 transition-all cursor-pointer">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-full">
                                <Icon name="Play" size={24} className="text-white" />
                              </div>
                              <div>
                                <p className="font-semibold">Смотреть видео</p>
                                <p className="text-sm text-muted-foreground">Детальная техника выполнения</p>
                              </div>
                            </div>
                            <Icon name="ExternalLink" size={18} className="text-muted-foreground" />
                          </div>
                        </Card>
                      </a>
                    </div>
                    
                    <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity py-6 text-lg">
                      <Icon name="Play" size={20} className="mr-2" />
                      Начать тренировку
                    </Button>
                  </div>
                </Card>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}