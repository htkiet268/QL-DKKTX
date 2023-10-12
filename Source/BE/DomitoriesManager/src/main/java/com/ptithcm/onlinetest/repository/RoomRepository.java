package com.ptithcm.onlinetest.repository;

import com.ptithcm.onlinetest.entity.RoomEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<RoomEntity, Long> {
    // Có thể thêm các phương thức tùy chỉnh xử lý truy vấn dữ liệu nếu cần
    List<RoomEntity> findAllByRoomName(String roomName);
}
