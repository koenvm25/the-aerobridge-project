package com.aerobridge.demo;

import com.aerobridge.demo.Services.MasterComponentService;

import java.util.Timer;
import java.util.TimerTask;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class AerobridgeApplication {

	public static void main(String[] args) {
		ApplicationContext applicationContext = SpringApplication.run(AerobridgeApplication.class, args);
		MasterComponentService masterComponentService = applicationContext.getBean(MasterComponentService.class);
		
		Timer timer = new Timer();
		timer.scheduleAtFixedRate(new TimerTask() {

		@Override
		public void run() {
			masterComponentService.scrapeMastercomponents();
		}

		}, 0, 1000 * 60 * 60 * 24);
	}
}


