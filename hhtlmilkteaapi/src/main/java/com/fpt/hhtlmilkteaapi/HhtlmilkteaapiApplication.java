package com.fpt.hhtlmilkteaapi;

import com.fpt.hhtlmilkteaapi.seed.SeedRolesTable;
import com.fpt.hhtlmilkteaapi.seed.SeedUsersTable;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;

import java.text.ParseException;

@SpringBootApplication
public class HhtlmilkteaapiApplication {

    public static void main(String[] args) {
        SpringApplication.run(HhtlmilkteaapiApplication.class, args);
    }

    @EventListener
    public void seed(ContextRefreshedEvent event) throws ParseException {

        SeedRolesTable.insertData();
        SeedUsersTable.insertData();

    }
}
