// src/data/devotionals.ts
import type { Devotional } from "../types";

export const devotionals: Devotional[] = [
  {
    id: "1",
    date: new Date().toDateString(),
    verse: {
      text: {
        NIV: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
        ESV: "For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope.",
        KJV: "For I know the thoughts that I think toward you, saith the Lord, thoughts of peace, and not of evil, to give you an expected end.",
        NKJV: "For I know the thoughts that I think toward you, says the Lord, thoughts of peace and not of evil, to give you a future and a hope.",
        NASB: "For I know the plans that I have for you,' declares the Lord, 'plans for prosperity and not for disaster, to give you a future and a hope.",
      },
      reference: "Jeremiah 29:11",
      defaultVersion: "NIV",
    },
    title: "God's Plans for You",
    content: `When life feels uncertain or challenging, it's comforting to remember that God has a plan for each of us. This verse from Jeremiah reminds us that even when we can't see the way forward, God is working behind the scenes for our good.

      His plans are not to harm us but to give us hope and a future. This doesn't mean we won't face difficulties, but rather that in the midst of them, we can trust that God is with us, guiding us toward a purposeful life.

      Today, reflect on areas where you need to trust God's plan more fully. Where might you be trying to control outcomes instead of surrendering to His will?`,
    prayer: `Heavenly Father, thank you for having good plans for my life. Help me to trust you more completely, especially when the path ahead seems unclear. Give me the faith to believe that you are working all things together for my good. Amen.`,
    readingPlan: "Jeremiah 29-30",
    reflection: [
      {
        id: "1-1",
        question:
          "What area of your life do you find hardest to trust God with?",
        placeholder: "Write about why this is difficult for you...",
      },
      {
        id: "1-2",
        question:
          "How might God be inviting you to surrender control in this situation?",
        placeholder: "Describe what surrender might look like...",
      },
      {
        id: "1-3",
        question: "What hope does this verse give you for your future?",
        placeholder: "Share the hopes that come to mind...",
      },
    ],
  },
  {
    id: "2",
    date: new Date(Date.now() - 86400000).toDateString(),
    verse: {
      text: {
        NIV: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
        ESV: "Trust in the Lord with all your heart, and do not lean on your own understanding. In all your ways acknowledge him, and he will make straight your paths.",
        KJV: "Trust in the Lord with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.",
        NKJV: "Trust in the Lord with all your heart, and lean not on your own understanding; In all your ways acknowledge Him, and He shall direct your paths.",
        NASB: "Trust in the Lord with all your heart and do not lean on your own understanding. In all your ways acknowledge Him, and He will make your paths straight.",
      },
      reference: "Proverbs 3:5-6",
      defaultVersion: "NIV",
    },
    title: "Trust in the Lord",
    content: `Trusting God completely is one of the most challenging yet rewarding aspects of our faith journey. It requires letting go of our need to understand everything and instead relying on God's infinite wisdom.

      When we surrender our plans and desires to God, He promises to guide our steps and direct our paths. This doesn't mean life will be without challenges, but that we can have confidence God is leading us in the right direction.

      Consider areas where you're struggling to trust God fully. What would it look like to release those concerns to Him today?`,
    prayer: `Lord, help me to trust You with all my heart and not rely on my own understanding. Guide my steps and make my paths straight as I submit my ways to You. Amen.`,
    readingPlan: "Proverbs 3-4",
    reflection: [
      {
        id: "2-1",
        question:
          "Where are you currently relying on your own understanding instead of trusting God?",
        placeholder: "Identify specific situations...",
      },
      {
        id: "2-2",
        question: "What would it look like to fully submit this area to God?",
        placeholder: "Describe practical steps of surrender...",
      },
      {
        id: "2-3",
        question: "How has God proven trustworthy in your past?",
        placeholder: "Recall specific examples...",
      },
    ],
  },
  {
    id: "3",
    date: new Date(Date.now() - 172800000).toDateString(),
    verse: {
      text: {
        NIV: "The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul.",
        ESV: "The Lord is my shepherd; I shall not want. He makes me lie down in green pastures. He leads me beside still waters. He restores my soul.",
        KJV: "The Lord is my shepherd; I shall not want. He maketh me to lie down in green pastures: he leadeth me beside the still waters. He restoreth my soul.",
        NKJV: "The Lord is my shepherd; I shall not want. He makes me to lie down in green pastures; He leads me beside the still waters. He restores my soul.",
        NASB: "The Lord is my shepherd, I will not be in need. He has me lie down in green pastures; He leads me beside quiet waters. He restores my soul.",
      },
      reference: "Psalm 23:1-3",
      defaultVersion: "NIV",
    },
    title: "The Good Shepherd",
    content: `In seasons of weariness or want, Psalm 23 reminds us of God's faithful provision and care. Like a shepherd tending his sheep, God guides us to places of rest and renewal. He knows exactly what we need—even when we don't recognize it ourselves.

    The imagery of green pastures and quiet waters speaks of God's desire to restore our souls. He doesn't merely provide for our physical needs but tends to our emotional and spiritual well-being.

    Where do you need God's shepherding today? Are you carrying burdens you could surrender to the One who promises to refresh your soul?`,
    prayer: `Lord, thank you for being my Shepherd. Help me to trust your guidance and rest in your provision. Renew my soul today and teach me to follow your voice. Amen.`,
    readingPlan: "Psalm 22-24",
    reflection: [
      {
        id: "3-1",
        question:
          "What burdens are you carrying that you need to surrender to God?",
        placeholder: "List the worries or responsibilities weighing on you...",
      },
      {
        id: "3-2",
        question: "How has God provided for you in times of need?",
        placeholder: "Remember specific instances of God's provision...",
      },
      {
        id: "3-3",
        question: "What would it look like to truly rest in God's care today?",
        placeholder: "Describe practical ways to find rest in God...",
      },
    ],
  },
  {
    id: "4",
    date: new Date(Date.now() - 259200000).toDateString(),
    verse: {
      text: {
        NIV: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.",
        ESV: "Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God.",
        KJV: "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.",
        NKJV: "Be anxious for nothing, but in everything by prayer and supplication, with thanksgiving, let your requests be made known to God.",
        NASB: "Do not be anxious about anything, but in everything by prayer and pleading with thanksgiving let your requests be made known to God.",
      },
      reference: "Philippians 4:6",
      defaultVersion: "NIV",
    },
    title: "Peace Beyond Understanding",
    content: `Anxiety is a common human experience, but God invites us to exchange our worries for his peace. This verse doesn't suggest we ignore real concerns, but rather bring them intentionally to God through prayer.

    Notice the emphasis on thanksgiving—even before answers come. Gratitude shifts our focus from problems to God's faithfulness in past situations.

    What anxieties are you holding today? Practice writing down your concerns as prayers, then list things you're thankful for in each situation.`,
    prayer: `Heavenly Father, I bring my worries to you today. Thank you for your constant care. Help me to replace anxiety with grateful prayer and trust in your goodness. Amen.`,
    readingPlan: "Philippians 3-4",
    reflection: [
      {
        id: "4-1",
        question: "What specific anxieties are you currently facing?",
        placeholder: "Name your worries and fears...",
      },
      {
        id: "4-2",
        question:
          "How can you practice gratitude in the midst of these anxieties?",
        placeholder: "List things you can thank God for even now...",
      },
      {
        id: "4-3",
        question:
          "What would it look like to fully release these concerns to God?",
        placeholder: "Describe what surrender would mean practically...",
      },
    ],
  },
  {
    id: "5",
    date: new Date(Date.now() - 345600000).toDateString(),
    verse: {
      text: {
        NIV: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.",
        ESV: "But they who wait for the Lord shall renew their strength; they shall mount up with wings like eagles; they shall run and not be weary; they shall walk and not faint.",
        KJV: "But they that wait upon the Lord shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.",
        NKJV: "But those who wait on the Lord shall renew their strength; They shall mount up with wings like eagles, They shall run and not be weary, They shall walk and not faint.",
        NASB: "Yet those who wait for the Lord will gain new strength; They will mount up with wings like eagles, They will run and not get tired, They will walk and not become weary.",
      },
      reference: "Isaiah 40:31",
      defaultVersion: "NIV",
    },
    title: "Renewed Strength",
    content: `Waiting on God isn't passive—it's an active posture of trust and expectation. This promise isn't for those who rely on their own strength, but for those who acknowledge their dependence on God.

    The imagery progresses from soaring to running to walking, reminding us that God provides strength for both extraordinary moments and daily perseverance.

    Are you feeling weary? How might God be inviting you to wait on him rather than striving in your own power?`,
    prayer: `Lord, I wait on you today. Renew my strength and help me to trust your timing. Teach me to rely on your power rather than my own limited resources. Amen.`,
    readingPlan: "Isaiah 40-41",
    reflection: [
      {
        id: "5-1",
        question:
          "In what areas of your life are you feeling weary or drained?",
        placeholder: "Identify the sources of your fatigue...",
      },
      {
        id: "5-2",
        question:
          "How might God be inviting you to wait on Him in these areas?",
        placeholder: "Consider what waiting actively looks like...",
      },
      {
        id: "5-3",
        question:
          "What does it mean to you that God promises to renew your strength?",
        placeholder: "Reflect on the promise of renewed strength...",
      },
    ],
  },
  {
    id: "6",
    date: new Date(Date.now() - 432000000).toDateString(),
    verse: {
      text: {
        NIV: "Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth.",
        ESV: "Be still, and know that I am God. I will be exalted among the nations, I will be exalted in the earth!",
        KJV: "Be still, and know that I am God: I will be exalted among the heathen, I will be exalted in the earth.",
        NKJV: "Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth!",
        NASB: "Cease striving and know that I am God; I will be exalted among the nations, I will be exalted on the earth.",
      },
      reference: "Psalm 46:10",
      defaultVersion: "NIV",
    },
    title: "The Power of Stillness",
    content: `In our noisy, busy world, God invites us to purposeful stillness. This isn't merely about physical quietness, but about acknowledging God's sovereignty in every circumstance.

    When we pause to remember who God is—his power, faithfulness, and majesty—our problems and worries shrink in perspective.

    Create space for stillness today. Even five minutes of silent meditation on God's character can recenter your soul on what truly matters.`,
    prayer: `God, help me to be still in your presence today. Remind me of your sovereignty over all things. Quiet my heart and help me to worship you above all else. Amen.`,
    readingPlan: "Psalm 46-48",
    reflection: [
      {
        id: "6-1",
        question: "What distractions keep you from being still before God?",
        placeholder: "Identify the things that pull your attention away...",
      },
      {
        id: "6-2",
        question:
          "How does remembering God's sovereignty change your perspective on current challenges?",
        placeholder: "Reflect on God's power and control...",
      },
      {
        id: "6-3",
        question:
          "What practical step can you take to create space for stillness today?",
        placeholder: "Plan a specific time and place for stillness...",
      },
    ],
  },
  {
    id: "7",
    date: new Date(Date.now() - 518400000).toDateString(),
    verse: {
      text: {
        NIV: "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!",
        ESV: "Therefore, if anyone is in Christ, he is a new creation. The old has passed away; behold, the new has come.",
        KJV: "Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new.",
        NKJV: "Therefore, if anyone is in Christ, he is a new creation; old things have passed away; behold, all things have become new.",
        NASB: "Therefore if anyone is in Christ, this person is a new creation; the old things passed away; behold, new things have come.",
      },
      reference: "2 Corinthians 5:17",
      defaultVersion: "NIV",
    },
    title: "Made New",
    content: `This verse proclaims the transformative power of Christ's redemption. Being "in Christ" isn't about external behavior modification but about fundamental identity change.

    God doesn't just improve us; he makes us new. The old patterns, guilt, and brokenness are replaced with purpose, forgiveness, and healing.

    What areas of your life still need to align with this new identity? How can you live today as someone truly made new in Christ?`,
    prayer: `Jesus, thank you for making me a new creation. Help me to live out this reality daily, leaving behind old patterns and embracing the identity you've given me. Amen.`,
    readingPlan: "2 Corinthians 4-6",
    reflection: [
      {
        id: "7-1",
        question:
          "What does being a 'new creation' in Christ mean to you personally?",
        placeholder: "Reflect on the meaning of this transformation...",
      },
      {
        id: "7-2",
        question: "Which old patterns or habits do you need to leave behind?",
        placeholder: "Identify areas where you need renewal...",
      },
      {
        id: "7-3",
        question: "How can you living out your new identity in Christ today?",
        placeholder: "Consider practical ways to embrace your new nature...",
      },
    ],
  },
];
