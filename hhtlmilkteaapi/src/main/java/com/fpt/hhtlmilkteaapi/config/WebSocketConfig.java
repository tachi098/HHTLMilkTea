package com.fpt.hhtlmilkteaapi.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(final StompEndpointRegistry registry) {
        registry.addEndpoint("/ws/message").setAllowedOriginPatterns("*");
        registry.addEndpoint("/ws/message").setAllowedOriginPatterns("*").withSockJS();


        registry.addEndpoint("/ws/group-order").setAllowedOriginPatterns("*");
        registry.addEndpoint("/ws/group-order").setAllowedOriginPatterns("*").withSockJS();
    }
}
