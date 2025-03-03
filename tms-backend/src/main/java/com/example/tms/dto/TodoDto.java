package com.example.tms.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TodoDto {

    // As the data passing happens between client and dto
    // So in json, use the variable names of dto not entity
    private Long id;

    private String title;

    private String description;

    private boolean completed;
}
