package com.ptithcm.onlinetest.payload.dto;

import lombok.Data;

import java.util.List;

@Data
public class RoomTypesDTO {
    private Long id;

    private int bedNumber;
    private String image;
    private int price;
    private String name;
    private String roomGender;
    private String description;
    private List<RoomDTO> roomDTOS;
}
