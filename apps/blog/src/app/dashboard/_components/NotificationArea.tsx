"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { NotificationComponent } from "./NotificationCard";
import { fetchNotifications } from "../../../lib/actions/notificationActions";

export default function NotificationsArea() {
  const { ref, inView } = useInView();

  const { data, error, status, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["notifications"],
      queryFn: ({ pageParam = 0 }) =>
        fetchNotifications({
          pageParam: JSON.parse(JSON.stringify(pageParam)),
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (status === "pending") return <div>Loading...</div>;
  if (status === "error") return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col gap-4 p-4">
      {data.pages.map((page) => (
        <div key={page.currentPage} className="flex flex-col gap-4">
          {page.data.map((notification:any) => (
            <NotificationComponent
              key={notification.id}
              notification={notification}
            />
          ))}
        </div>
      ))}
      <div ref={ref}>{isFetchingNextPage && "Loading more..."}</div>
    </div>
  );
}
