useLayoutEffect(() => {
  const chatRoomQuery = query(
    collection(database, "chatrooms"),
    orderBy("chatroomId", "desc")
  );

  const unsub = onSnapshot(chatRoomQuery, (querySnapShot) => {
    const rooms = querySnapShot.docs.map((doc) => doc.data());
    setChatRooms(rooms);
    setLoading(false);
  });

  return unsub;
}, []);

const onRefresh = useCallback(() => {
  setRefreshing(true);
  setTimeout(() => {
    setRefreshing(false);
  }, 2000);
}, []);

// Function to fetch chat rooms
const fetchChatRooms = useCallback(async () => {
  setLoading(true); // Consider moving this inside the if(!refreshing) if you don't want to show loading indicator on pull to refresh
  const chatRoomQuery = query(
    collection(database, "chatrooms"),
    orderBy("chatroomId", "desc")
  );

  const unsub = onSnapshot(chatRoomQuery, (querySnapshot) => {
    const rooms = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setChatRooms(rooms);
    if (refreshing) {
      setRefreshing(false); // Stop the refreshing indicator
    }
    setLoading(false);
  });

  return () => unsub(); // Cleanup subscription on unmount
}, [refreshing]); // Dependencies

// Effect to fetch chat rooms on mount and refreshing change
useEffect(() => {
  fetchChatRooms();
}, [fetchChatRooms]);

// Pull to refresh handler
const onRefresh = useCallback(() => {
  setRefreshing(true);
  fetchChatRooms(); // Call your fetch function here
}, [fetchChatRooms]);
