import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  Trophy,
  Heart,
  Music,
  Book,
  Coffee,
  Target,
  TrendingUp,
  Smile,
  BarChart3,
  Timer,
  MapPin,
  RefreshCw,
  Wallet,
  Plus,
  Minus,
  CheckCircle,
  Circle,
  DollarSign,
  TrendingDown,
  Award,
  Flame,
  Settings,
  Save,
  Edit3,
  User,
  Trash2,
  X,
} from "lucide-react";

const RaphaelDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [moodToday, setMoodToday] = useState("");
  const [studyStreak, setStudyStreak] = useState(12);
  const [garriCount, setGarriCount] = useState(3);
  const [stressLevel, setStressLevel] = useState(4);
  const [loading, setLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Personal Details State
  const [personalDetails, setPersonalDetails] = useState({
    name: "Raphael",
    monthlyAllowance: 25000,
    currentBalance: 8500,
    allowanceDay: 1, // Day of month when allowance comes
    location: "Lagos, Nigeria",
    university: "UNILAG",
    course: "Sociology",
    level: "300L",
    gpaTarget: 4.5,
  });

  const [editingDetails, setEditingDetails] = useState(false);
  const [tempDetails, setTempDetails] = useState({ ...personalDetails });

  // Budget Manager State
  const [budget, setBudget] = useState({
    dailySpend: 850,
    expenses: [
      {
        id: 1,
        item: "Garri & Groundnut",
        amount: 300,
        category: "food",
        date: "Today",
      },
      {
        id: 2,
        item: "Keke to Campus",
        amount: 150,
        category: "transport",
        date: "Today",
      },
      {
        id: 3,
        item: "Photocopy (Oyakhire notes)",
        amount: 200,
        category: "academic",
        date: "Yesterday",
      },
    ],
  });

  // Calculate days until next allowance
  const getDaysUntilAllowance = () => {
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    let nextAllowanceDate = new Date(
      currentYear,
      currentMonth,
      personalDetails.allowanceDay
    );

    if (currentDay >= personalDetails.allowanceDay) {
      // Next allowance is next month
      nextAllowanceDate = new Date(
        currentYear,
        currentMonth + 1,
        personalDetails.allowanceDay
      );
    }

   const timeDiff = nextAllowanceDate.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  };

  // Goals State
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: `Maintain ${personalDetails.gpaTarget}+ GPA this semester`,
      progress: 75,
      deadline: "2025-09-15",
      category: "academic",
      streak: 8,
    },
    {
      id: 2,
      title: "Visit orphanage monthly (Lofty Scheme)",
      progress: 90,
      deadline: "2025-12-01",
      category: "social",
      streak: 12,
    },
    {
      id: 3,
      title: "Save ₦15,000 for Barcelona jersey",
      progress: 40,
      deadline: "2025-08-30",
      category: "personal",
      streak: 5,
    },
    {
      id: 4,
      title: "Learn 10 new Messi skills in FC Mobile",
      progress: 60,
      deadline: "2025-07-15",
      category: "fun",
      streak: 3,
    },
  ]);

  const [newExpense, setNewExpense] = useState({
    item: "",
    amount: "",
    category: "food",
  });
  const [newGoal, setNewGoal] = useState({
    title: "",
    deadline: "",
    category: "personal",
  });

  // Sample data that would normally come from APIs
  const [barcelonaNews] = useState([
    {
      title: "Pedri returns to training ahead of El Clasico",
      publishedAt: "Today",
    },
    {
      title: "Xavi praises team's defensive improvement",
      publishedAt: "Yesterday",
    },
    { title: "Gavi nominated for Golden Boy award", publishedAt: "2 days ago" },
  ]);

  const [weatherData] = useState({
    temp: 28,
    condition: "Partly Cloudy",
    humidity: 75,
  });

  const [spotifyData] = useState({
    todaysSong: "Essence (feat. Tems)",
    popularity: 95,
    recentTracks: [
      "More Love, Less Ego",
      "Bad To Me",
      "Mood (feat. Buju)",
      "Essence (feat. Tems)",
    ],
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Personal Details Functions
const handleDetailsChange = (field: string, value: any) => {
  setTempDetails((prev) => ({
    ...prev,
    [field]: value,
  }));
};

  const savePersonalDetails = () => {
    setPersonalDetails({ ...tempDetails });
    setEditingDetails(false);

    // Update goals that reference GPA target
    setGoals((prev) =>
      prev.map((goal) =>
        goal.category === "academic" && goal.title.includes("GPA")
          ? {
              ...goal,
              title: `Maintain ${tempDetails.gpaTarget}+ GPA this semester`,
            }
          : goal
      )
    );
  };

  const cancelEdit = () => {
    setTempDetails({ ...personalDetails });
    setEditingDetails(false);
  };

  // Budget Functions
  const addExpense = () => {
    if (newExpense.item && newExpense.amount) {
      const expense = {
        id: Date.now(),
        item: newExpense.item,
        amount: parseInt(newExpense.amount),
        category: newExpense.category,
        date: "Today",
      };
      setBudget((prev) => ({
        ...prev,
        expenses: [expense, ...prev.expenses.slice(0, 4)],
      }));

      // Update current balance in personal details
      setPersonalDetails((prev) => ({
        ...prev,
        currentBalance: prev.currentBalance - expense.amount,
      }));

      setNewExpense({ item: "", amount: "", category: "food" });
    }
  };

  const getBudgetStatus = () => {
    const dailyRecommended = personalDetails.monthlyAllowance / 30;
    if (budget.dailySpend > dailyRecommended * 1.5)
      return {
        status: "danger",
        color: "bg-red-500",
        message: "Spending too much!",
      };
    if (budget.dailySpend > dailyRecommended)
      return {
        status: "warning",
        color: "bg-yellow-500",
        message: "Watch your spending",
      };
    return {
      status: "good",
      color: "bg-green-500",
      message: "Great job saving!",
    };
  };

  // Goal Functions
  const addGoal = () => {
    if (newGoal.title && newGoal.deadline) {
      const goal = {
        id: Date.now(),
        title: newGoal.title,
        progress: 0,
        deadline: newGoal.deadline,
        category: newGoal.category,
        streak: 0,
      };
      setGoals((prev) => [goal, ...prev]);
      setNewGoal({ title: "", deadline: "", category: "personal" });
    }
  };

const updateGoalProgress = (goalId: number, newProgress: number) => {
  setGoals((prev) =>
    prev.map((goal) =>
      goal.id === goalId
        ? { ...goal, progress: Math.min(newProgress, 100) }
        : goal
    )
  );
};

const getGoalCategoryIcon = (
  category: "academic" | "social" | "personal" | "fun"
) => {
  switch (category) {
    case "academic":
      return <Book className="w-4 h-4" />;
    case "social":
      return <Heart className="w-4 h-4" />;
    case "personal":
      return <Target className="w-4 h-4" />;
    case "fun":
      return <Trophy className="w-4 h-4" />;
    default:
      return <Circle className="w-4 h-4" />;
  }
};


 const deleteGoal = (goalId: number) => {
  setGoals((prev) => prev.filter((goal) => goal.id !== goalId));
};

  // Entertainment/Sources Functions
  const [entertainmentSources, setEntertainmentSources] = useState({
    footballTeam: "Barcelona",
    musicArtist: "Wizkid",
    mobileGame: "FC Mobile",
    favoriteFood: "Garri",
    transportMode: "Keke",
  });

  const [editingEntertainment, setEditingEntertainment] = useState(false);
  const [tempEntertainment, setTempEntertainment] = useState({
    ...entertainmentSources,
  });

  type EntertainmentField =
  | "footballTeam"
  | "musicArtist"
  | "mobileGame"
  | "favoriteFood"
  | "transportMode";

 const handleEntertainmentChange = (
  field: EntertainmentField,
  value: string
) => {
  setTempEntertainment((prev) => ({
    ...prev,
    [field]: value,
  }));
};

  const saveEntertainmentSources = () => {
    setEntertainmentSources({ ...tempEntertainment });
    setEditingEntertainment(false);
  };

  const cancelEntertainmentEdit = () => {
    setTempEntertainment({ ...entertainmentSources });
    setEditingEntertainment(false);
  };

  // Class Schedule State and Functions
  const [classSchedule, setClassSchedule] = useState({
    challengingClass: "Oyakhire",
    classDay: "Thursday",
    startTime: "12:00",
    endTime: "14:00",
    location: "Main Campus",
  });

  const [editingSchedule, setEditingSchedule] = useState(false);
  const [tempSchedule, setTempSchedule] = useState({ ...classSchedule });

  const handleScheduleChange = (field, value) => {
    setTempSchedule((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveClassSchedule = () => {
    setClassSchedule({ ...tempSchedule });
    setEditingSchedule(false);
  };

  const cancelScheduleEdit = () => {
    setTempSchedule({ ...classSchedule });
    setEditingSchedule(false);
  };

  // Dynamic News/Content based on user preferences
  const [customNews] = useState([
    {
      title: `${entertainmentSources.footballTeam} training update`,
      publishedAt: "Today",
    },
    {
      title: `${entertainmentSources.footballTeam} coach press conference`,
      publishedAt: "Yesterday",
    },
    {
      title: `New ${entertainmentSources.footballTeam} jersey revealed`,
      publishedAt: "2 days ago",
    },
  ]);

  const [customMusic] = useState({
    todaysSong: `${entertainmentSources.musicArtist} - Latest Hit`,
    popularity: 95,
    recentTracks: [
      `${entertainmentSources.musicArtist} - Song 1`,
      `${entertainmentSources.musicArtist} - Song 2`,
      `${entertainmentSources.musicArtist} - Song 3`,
      `${entertainmentSources.musicArtist} - Song 4`,
    ],
  });

  // Dynamic Challenge Class calculations
  const getNextClassEncounter = () => {
    const now = new Date();
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDay = dayNames[now.getDay()];
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const classDayIndex = dayNames.indexOf(classSchedule.classDay);
    const [startHour, startMin] = classSchedule.startTime
      .split(":")
      .map(Number);
    const [endHour, endMin] = classSchedule.endTime.split(":").map(Number);
    const classStartTime = startHour * 60 + startMin;
    const classEndTime = endHour * 60 + endMin;

    if (currentDay === classSchedule.classDay) {
      if (currentTime < classStartTime) {
        const timeLeft = classStartTime - currentTime;
        const hours = Math.floor(timeLeft / 60);
        const minutes = timeLeft % 60;
        return {
          status: "today",
          message: `${classSchedule.challengingClass} class starts in ${hours}h ${minutes}m`,
          color: "text-yellow-400",
        };
      } else if (currentTime >= classStartTime && currentTime <= classEndTime) {
        return {
          status: "ongoing",
          message: `${classSchedule.challengingClass} class is happening now! 😱`,
          color: "text-red-400",
        };
      }
    }

    // Calculate days until next class
    let daysUntil = (classDayIndex + 7 - now.getDay()) % 7;
    if (daysUntil === 0) daysUntil = 7; // Next week if today is the class day but class is over

    return {
      status: "upcoming",
      message: `${daysUntil} day${daysUntil !== 1 ? "s" : ""} until ${
        classSchedule.challengingClass
      }`,
      color: "text-green-400",
    };
  };

  // Dynamic challenges based on user's game preference
  const getDailyChallenges = () => {
    const day = currentTime.getDay();
    const gameChallenge = {
      0: `Score 5 goals in ${entertainmentSources.mobileGame} - Sunday Funday!`,
      1: `Complete 3 matches in ${entertainmentSources.mobileGame} - Monday Motivation`,
      2: `Learn a new skill move in ${entertainmentSources.mobileGame}`,
      3: `Beat your high score in ${entertainmentSources.mobileGame}`,
      4: `Light ${entertainmentSources.mobileGame} session (${classSchedule.challengingClass} day!)`,
      5: `${entertainmentSources.mobileGame} tournament mode - Friday Power!`,
      6: `Weekend warrior mode in ${entertainmentSources.mobileGame}!`,
    };
    return gameChallenge[day] || `Play ${entertainmentSources.mobileGame}!`;
  };

  // Context-aware quotes
  const getContextualQuote = () => {
    const classInfo = getNextClassEncounter();
    if (stressLevel > 7) {
      return "Pressure makes diamonds. You've got this! 💎";
    }
    if (classInfo.status === "today" || classInfo.status === "ongoing") {
      return "Study hard, but stay calm. Success comes to those who persevere! 📚";
    }
    return "Just like in football, life is about the next play. Keep moving forward! ⚽";
  };

  // Dynamic music based on mood and artist preference
  const getContextualSong = () => {
    const hour = currentTime.getHours();
    if (hour < 10) {
      return `${entertainmentSources.musicArtist} - Morning Motivation`;
    } else if (hour < 18) {
      return `${entertainmentSources.musicArtist} - Afternoon Vibes`;
    } else {
      return `${entertainmentSources.musicArtist} - Evening Chill`;
    }
  };

  // Expense Functions
  const deleteExpense = (expenseId) => {
    const expense = budget.expenses.find((exp) => exp.id === expenseId);
    if (expense) {
      setBudget((prev) => ({
        ...prev,
        expenses: prev.expenses.filter((exp) => exp.id !== expenseId),
      }));

      // Refund the amount back to balance
      setPersonalDetails((prev) => ({
        ...prev,
        currentBalance: prev.currentBalance + expense.amount,
      }));
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "food":
        return <Coffee className="w-4 h-4" />;
      case "transport":
        return <MapPin className="w-4 h-4" />;
      case "academic":
        return <Book className="w-4 h-4" />;
      case "fun":
        return <Trophy className="w-4 h-4" />;
      default:
        return <DollarSign className="w-4 h-4" />;
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-red-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-black/30 backdrop-blur-md rounded-2xl p-6 mb-6 border border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {getGreeting()}, {personalDetails.name}! 👋
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {currentTime.toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {currentTime.toLocaleTimeString()}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {personalDetails.location} • {weatherData.temp}°C,{" "}
                  {weatherData.condition}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600/80 hover:bg-blue-600 text-white rounded-lg transition-all"
              >
                <RefreshCw
                  className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                />
                Refresh
              </button>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600/80 hover:bg-gray-600 text-white rounded-lg transition-all"
              >
                <Settings className="w-4 h-4" />
                Settings
              </button>
            </div>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 mb-6 border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Settings</h2>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Personal Details Settings */}
              <div className="bg-white/5 rounded-xl p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Details
                  </h3>
                  <button
                    onClick={() => setEditingDetails(!editingDetails)}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>

                {editingDetails ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Name"
                      value={tempDetails.name}
                      onChange={(e) =>
                        handleDetailsChange("name", e.target.value)
                      }
                      className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400"
                    />
                    <input
                      type="number"
                      placeholder="Monthly Allowance"
                      value={tempDetails.monthlyAllowance}
                      onChange={(e) =>
                        handleDetailsChange(
                          "monthlyAllowance",
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400"
                    />
                    <input
                      type="number"
                      placeholder="Current Balance"
                      value={tempDetails.currentBalance}
                      onChange={(e) =>
                        handleDetailsChange(
                          "currentBalance",
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400"
                    />
                    <input
                      type="number"
                      placeholder="Allowance Day (1-31)"
                      value={tempDetails.allowanceDay}
                      onChange={(e) =>
                        handleDetailsChange(
                          "allowanceDay",
                          parseInt(e.target.value) || 1
                        )
                      }
                      className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400"
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      value={tempDetails.location}
                      onChange={(e) =>
                        handleDetailsChange("location", e.target.value)
                      }
                      className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400"
                    />
                    <input
                      type="text"
                      placeholder="University"
                      value={tempDetails.university}
                      onChange={(e) =>
                        handleDetailsChange("university", e.target.value)
                      }
                      className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400"
                    />
                    <input
                      type="text"
                      placeholder="Course"
                      value={tempDetails.course}
                      onChange={(e) =>
                        handleDetailsChange("course", e.target.value)
                      }
                      className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400"
                    />
                    <input
                      type="text"
                      placeholder="Level"
                      value={tempDetails.level}
                      onChange={(e) =>
                        handleDetailsChange("level", e.target.value)
                      }
                      className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400"
                    />
                    <input
                      type="number"
                      step="0.1"
                      placeholder="GPA Target"
                      value={tempDetails.gpaTarget}
                      onChange={(e) =>
                        handleDetailsChange(
                          "gpaTarget",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={savePersonalDetails}
                        className="flex-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                      >
                        <Save className="w-4 h-4 inline mr-2" />
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="flex-1 px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 text-sm text-gray-300">
                    <p>
                      <span className="text-white">Name:</span>{" "}
                      {personalDetails.name}
                    </p>
                    <p>
                      <span className="text-white">Allowance:</span> ₦
                      {personalDetails.monthlyAllowance.toLocaleString()}
                    </p>
                    <p>
                      <span className="text-white">Balance:</span> ₦
                      {personalDetails.currentBalance.toLocaleString()}
                    </p>
                    <p>
                      <span className="text-white">Location:</span>{" "}
                      {personalDetails.location}
                    </p>
                    <p>
                      <span className="text-white">University:</span>{" "}
                      {personalDetails.university}
                    </p>
                    <p>
                      <span className="text-white">Course:</span>{" "}
                      {personalDetails.course} ({personalDetails.level})
                    </p>
                    <p>
                      <span className="text-white">GPA Target:</span>{" "}
                      {personalDetails.gpaTarget}
                    </p>
                  </div>
                )}
              </div>

              {/* Entertainment Sources Settings */}
              <div className="bg-white/5 rounded-xl p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Music className="w-5 h-5" />
                    Entertainment
                  </h3>
                  <button
                    onClick={() =>
                      setEditingEntertainment(!editingEntertainment)
                    }
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>

                {editingEntertainment ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Football Team"
                      value={tempEntertainment.footballTeam}
                      onChange={(e) =>
                        handleEntertainmentChange(
                          "footballTeam",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400"
                    />
                    <input
                      type="text"
                      placeholder="Music Artist"
                      value={tempEntertainment.musicArtist}
                      onChange={(e) =>
                        handleEntertainmentChange("musicArtist", e.target.value)
                      }
                      className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400"
                    />
                    <input
                      type="text"
                      placeholder="Mobile Game"
                      value={tempEntertainment.mobileGame}
                      onChange={(e) =>
                        handleEntertainmentChange("mobileGame", e.target.value)
                      }
                      className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400"
                    />
                    <input
                      type="text"
                      placeholder="Favorite Food"
                      value={tempEntertainment.favoriteFood}
                      onChange={(e) =>
                        handleEntertainmentChange(
                          "favoriteFood",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400"
                    />
                    <input
                      type="text"
                      placeholder="Transport Mode"
                      value={tempEntertainment.transportMode}
                      onChange={(e) =>
                        handleEntertainmentChange(
                          "transportMode",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={saveEntertainmentSources}
                        className="flex-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                      >
                        <Save className="w-4 h-4 inline mr-2" />
                        Save
                      </button>
                      <button
                        onClick={cancelEntertainmentEdit}
                        className="flex-1 px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 text-sm text-gray-300">
                    <p>
                      <span className="text-white">Team:</span>{" "}
                      {entertainmentSources.footballTeam}
                    </p>
                    <p>
                      <span className="text-white">Artist:</span>{" "}
                      {entertainmentSources.musicArtist}
                    </p>
                    <p>
                      <span className="text-white">Game:</span>{" "}
                      {entertainmentSources.mobileGame}
                    </p>
                    <p>
                      <span className="text-white">Food:</span>{" "}
                      {entertainmentSources.favoriteFood}
                    </p>
                    <p>
                      <span className="text-white">Transport:</span>{" "}
                      {entertainmentSources.transportMode}
                    </p>
                  </div>
                )}
              </div>

              {/* Class Schedule Settings */}
              <div className="bg-white/5 rounded-xl p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Class Schedule
                  </h3>
                  <button
                    onClick={() => setEditingSchedule(!editingSchedule)}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>

                {editingSchedule ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Challenging Class Name"
                      value={tempSchedule.challengingClass}
                      onChange={(e) =>
                        handleScheduleChange("challengingClass", e.target.value)
                      }
                      className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400"
                    />
                    <select
                      value={tempSchedule.classDay}
                      onChange={(e) =>
                        handleScheduleChange("classDay", e.target.value)
                      }
                      className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-white"
                    >
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                      <option value="Saturday">Saturday</option>
                      <option value="Sunday">Sunday</option>
                    </select>
                    <input
                      type="time"
                      value={tempSchedule.startTime}
                      onChange={(e) =>
                        handleScheduleChange("startTime", e.target.value)
                      }
                      className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-white"
                    />
                    <input
                      type="time"
                      value={tempSchedule.endTime}
                      onChange={(e) =>
                        handleScheduleChange("endTime", e.target.value)
                      }
                      className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-white"
                    />
                    <input
                      type="text"
                      placeholder="Class Location"
                      value={tempSchedule.location}
                      onChange={(e) =>
                        handleScheduleChange("location", e.target.value)
                      }
                      className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={saveClassSchedule}
                        className="flex-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                      >
                        <Save className="w-4 h-4 inline mr-2" />
                        Save
                      </button>
                      <button
                        onClick={cancelScheduleEdit}
                        className="flex-1 px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 text-sm text-gray-300">
                    <p>
                      <span className="text-white">Class:</span>{" "}
                      {classSchedule.challengingClass}
                    </p>
                    <p>
                      <span className="text-white">Day:</span>{" "}
                      {classSchedule.classDay}
                    </p>
                    <p>
                      <span className="text-white">Time:</span>{" "}
                      {classSchedule.startTime} - {classSchedule.endTime}
                    </p>
                    <p>
                      <span className="text-white">Location:</span>{" "}
                      {classSchedule.location}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Smart Budget Manager */}
          <div className="md:col-span-2 bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Wallet className="w-6 h-6" />
                Smart Budget Manager
              </h2>
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  getBudgetStatus().color
                }`}
              >
                {getBudgetStatus().message}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-2xl font-bold text-white mb-1">
                  ₦{personalDetails.currentBalance.toLocaleString()}
                </div>
                <div className="text-gray-300 text-sm">Current Balance</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-2xl font-bold text-white mb-1">
                  {getDaysUntilAllowance()}
                </div>
                <div className="text-gray-300 text-sm">
                  Days until allowance
                </div>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-2xl font-bold text-white mb-1">
                  ₦
                  {Math.floor(
                    personalDetails.currentBalance / getDaysUntilAllowance()
                  ).toLocaleString()}
                </div>
                <div className="text-gray-300 text-sm">Daily budget</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Quick Expense Tracker
                </h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="What did you buy?"
                    value={newExpense.item}
                    onChange={(e) =>
                      setNewExpense({ ...newExpense, item: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400"
                  />
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Amount (₦)"
                      value={newExpense.amount}
                      onChange={(e) =>
                        setNewExpense({ ...newExpense, amount: e.target.value })
                      }
                      className="flex-1 px-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400"
                    />
                    <select
                      value={newExpense.category}
                      onChange={(e) =>
                        setNewExpense({
                          ...newExpense,
                          category: e.target.value,
                        })
                      }
                      className="px-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white"
                    >
                      <option value="food">Food</option>
                      <option value="transport">Transport</option>
                      <option value="academic">Academic</option>
                      <option value="fun">Fun</option>
                    </select>
                  </div>
                  <button
                    onClick={addExpense}
                    className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Expense
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Recent Expenses
                </h3>
                <div className="space-y-2">
                  {budget.expenses.slice(0, 3).map((expense) => (
                    <div
                      key={expense.id}
                      className="flex items-center justify-between bg-white/5 rounded-lg p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-blue-400">
                          {getCategoryIcon(expense.category)}
                        </div>
                        <div>
                          <div className="text-white text-sm font-medium">
                            {expense.item}
                          </div>
                          <div className="text-gray-400 text-xs">
                            {expense.date}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-red-400 font-medium">
                          -₦{expense.amount}
                        </span>
                        <button
                          onClick={() => deleteExpense(expense.id)}
                          className="text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Goal Achievement System */}
          <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Target className="w-6 h-6" />
              Goal Achievement System
            </h2>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">
                Add New Goal
              </h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="What's your goal?"
                  value={newGoal.title}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, title: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400"
                />
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, deadline: e.target.value })
                    }
                    className="flex-1 px-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white"
                  />
                  <select
                    value={newGoal.category}
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, category: e.target.value })
                    }
                    className="px-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white"
                  >
                    <option value="academic">Academic</option>
                    <option value="social">Social</option>
                    <option value="personal">Personal</option>
                    <option value="fun">Fun</option>
                  </select>
                </div>
                <button
                  onClick={addGoal}
                  className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Goal
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Active Goals</h3>
              {goals.map((goal) => (
                <div key={goal.id} className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="text-blue-400">
                        {getGoalCategoryIcon(goal.category)}
                      </div>
                      <div>
                        <h4 className="text-white font-medium text-sm">
                          {goal.title}
                        </h4>
                        <p className="text-gray-400 text-xs">
                          Due: {new Date(goal.deadline).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-orange-400 flex items-center gap-1">
                        <Flame className="w-4 h-4" />
                        <span className="text-sm">{goal.streak}</span>
                      </div>
                      <button
                        onClick={() => deleteGoal(goal.id)}
                        className="text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-white">{goal.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        updateGoalProgress(goal.id, goal.progress - 10)
                      }
                      className="flex-1 px-3 py-1 bg-red-600/80 hover:bg-red-600 text-white rounded text-sm transition-colors"
                    >
                      -10%
                    </button>
                    <button
                      onClick={() =>
                        updateGoalProgress(goal.id, goal.progress + 10)
                      }
                      className="flex-1 px-3 py-1 bg-green-600/80 hover:bg-green-600 text-white rounded text-sm transition-colors"
                    >
                      +10%
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Dangote Command Center */}
          <div className="md:col-span-2 bg-gradient-to-br from-yellow-600/20 to-orange-600/20 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Award className="w-6 h-6" />
              Next Dangote Command Center
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  {entertainmentSources.footballTeam} News
                </h3>
                <div className="space-y-3">
                  {customNews.map((article, index) => (
                    <div key={index} className="bg-white/5 rounded-lg p-3">
                      <h4 className="text-white text-sm font-medium mb-1">
                        {article.title}
                      </h4>
                      <p className="text-gray-400 text-xs">
                        {article.publishedAt}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  {entertainmentSources.mobileGame} Challenge
                </h3>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-center">
                    <div className="text-3xl mb-2">🎮</div>
                    <p className="text-white text-sm font-medium mb-2">
                      Today's Challenge
                    </p>
                    <p className="text-gray-300 text-sm">
                      {getDailyChallenges()}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Motivation Corner
                </h3>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-center">
                    <div className="text-3xl mb-2">💭</div>
                    <p className="text-yellow-300 text-sm italic">
                      "{getContextualQuote()}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Class Anxiety Management */}
          <div className="bg-gradient-to-br from-red-600/20 to-pink-600/20 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Timer className="w-6 h-6" />
              {classSchedule.challengingClass} Anxiety Management
            </h2>

            <div className="text-center mb-6">
              <div className="text-4xl mb-2">😰</div>
              <div
                className={`text-lg font-semibold mb-2 ${
                  getNextClassEncounter().color
                }`}
              >
                {getNextClassEncounter().message}
              </div>
              <div className="text-gray-300 text-sm">
                {classSchedule.classDay}s • {classSchedule.startTime} -{" "}
                {classSchedule.endTime}
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <h3 className="text-white font-medium mb-2">
                Survival Statistics
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-2xl font-bold text-green-400">15</div>
                  <div className="text-gray-400">Classes Survived</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-400">93%</div>
                  <div className="text-gray-400">Success Rate</div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-white font-medium mb-2">Quick Tips</h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Review notes 30 minutes before</li>
                <li>• Bring extra pens and paper</li>
                <li>• Sit in the middle rows</li>
                <li>• Deep breathing exercises</li>
              </ul>
            </div>
          </div>

          {/* Study Analytics */}
          <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <BarChart3 className="w-6 h-6" />
              Study Analytics
            </h2>

            <div className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">
                  {studyStreak}
                  <span className="text-orange-400 ml-2">🔥</span>
                </div>
                <p className="text-gray-300">Day Study Streak</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <div className="text-xl font-bold text-white">
                    {personalDetails.gpaTarget}
                  </div>
                  <div className="text-gray-400 text-sm">Target GPA</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <div className="text-xl font-bold text-white">85%</div>
                  <div className="text-gray-400 text-sm">Semester Progress</div>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => setStudyStreak(studyStreak + 1)}
                  className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Log Study Session
                </button>
                <button
                  onClick={() => setStudyStreak(Math.max(0, studyStreak - 1))}
                  className="w-full px-4 py-2 bg-red-600/80 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  Reset Streak
                </button>
              </div>
            </div>
          </div>

          {/* Music & Mood */}
          <div className="bg-gradient-to-br from-green-600/20 to-teal-600/20 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Music className="w-6 h-6" />
              {entertainmentSources.musicArtist} Vibes
            </h2>

            <div className="space-y-6">
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-white font-medium mb-2">Now Playing</h3>
                <p className="text-green-400 text-sm">{getContextualSong()}</p>
              </div>

              <div>
                <h3 className="text-white font-medium mb-3">
                  How are you feeling?
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {["😊", "😎", "😴", "🤔"].map((mood) => (
                    <button
                      key={mood}
                      onClick={() => setMoodToday(mood)}
                      className={`p-3 rounded-lg text-2xl transition-colors ${
                        moodToday === mood
                          ? "bg-green-600"
                          : "bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      {mood}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-white font-medium mb-2">Recent Tracks</h3>
                <div className="space-y-2">
                  {customMusic.recentTracks.slice(0, 3).map((track, index) => (
                    <div key={index} className="bg-white/5 rounded p-2">
                      <p className="text-gray-300 text-xs">{track}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Wellness Tracker */}
          <div className="bg-gradient-to-br from-pink-600/20 to-rose-600/20 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Heart className="w-6 h-6" />
              Wellness Tracker
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-white font-medium mb-3">
                  {entertainmentSources.favoriteFood} Counter
                </h3>
                <div className="flex items-center justify-between bg-white/5 rounded-lg p-4">
                  <button
                    onClick={() => setGarriCount(Math.max(0, garriCount - 1))}
                    className="p-2 bg-red-600/80 hover:bg-red-600 text-white rounded-lg transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">
                      {garriCount}
                    </div>
                    <div className="text-gray-400 text-sm">Today</div>
                  </div>
                  <button
                    onClick={() => setGarriCount(garriCount + 1)}
                    className="p-2 bg-green-600/80 hover:bg-green-600 text-white rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-white font-medium mb-3">Stress Level</h3>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Chill</span>
                    <span className="text-white">{stressLevel}/10</span>
                    <span className="text-gray-400">Stressed</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={stressLevel}
                    onChange={(e) => setStressLevel(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div
                    className={`mt-2 text-center text-sm ${
                      stressLevel <= 3
                        ? "text-green-400"
                        : stressLevel <= 6
                        ? "text-yellow-400"
                        : "text-red-400"
                    }`}
                  >
                    {stressLevel <= 3
                      ? "Feeling great! 😌"
                      : stressLevel <= 6
                      ? "Moderate stress 😐"
                      : "High stress! Take a break 😵"}
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-white font-medium mb-2">Wellness Tip</h3>
                <p className="text-gray-300 text-sm">
                  {stressLevel > 7
                    ? "Take deep breaths and go for a walk"
                    : stressLevel > 4
                    ? "Listen to some music and relax"
                    : "Keep up the great work!"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Dashboard */}
        <div className="mt-6 bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Daily Summary
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-green-600/20 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">
                ₦{personalDetails.currentBalance.toLocaleString()}
              </div>
              <div className="text-gray-300 text-sm">Balance</div>
            </div>
            <div className="bg-blue-600/20 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">{studyStreak}</div>
              <div className="text-gray-300 text-sm">Study Streak</div>
            </div>
            <div className="bg-purple-600/20 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">
                {goals.filter((g) => g.progress === 100).length}
              </div>
              <div className="text-gray-300 text-sm">Goals Done</div>
            </div>
            <div className="bg-yellow-600/20 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">{garriCount}</div>
              <div className="text-gray-300 text-sm">
                {entertainmentSources.favoriteFood} Today
              </div>
            </div>
            <div className="bg-pink-600/20 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">
                {10 - stressLevel}
              </div>
              <div className="text-gray-300 text-sm">Chill Level</div>
            </div>
            <div className="bg-red-600/20 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">
                {getDaysUntilAllowance()}
              </div>
              <div className="text-gray-300 text-sm">Days to Allowance</div>
            </div>
          </div>
        </div>
        <footer className="mt-6 p-4 bg-black/30 backdrop-blur-md rounded-2xl text-center text-gray-300">
          <p className="text-sm">
            Designed and created with love from <strong>David Ariyo</strong>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default RaphaelDashboard;
