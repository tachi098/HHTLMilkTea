package com.fpt.hhtlmilkteaapi.controller;

import com.fpt.hhtlmilkteaapi.payload.request.UrlShorterRequest;
import com.fpt.hhtlmilkteaapi.service.UrlShorterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/shared")
public class ShorterController {

    @Value("${get.request.path}")
    String getMappingRequestPath;

    @Autowired
    private UrlShorterService urlShorterService;

    @PostMapping("${get.request.path}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> generateUrl(@RequestBody UrlShorterRequest urlShorterRequest, HttpServletRequest httpServletRequest) {
        String longUrl = urlShorterRequest.getLongUrl().trim();
        urlShorterService.setServletRequest(httpServletRequest);
        return ResponseEntity.ok(urlShorterService.generateShortUrl(longUrl));
    }

    @GetMapping("{key}")
    @PreAuthorize("permitAll()")
    public ModelAndView forwardToLongUrl(@PathVariable("key") String key, HttpServletRequest httpServletRequest, HttpServletResponse resp) throws IOException {
        String shortUrl = (httpServletRequest.getHeader("host") + httpServletRequest.getRequestURI()).trim();
        urlShorterService.setServletRequest(httpServletRequest);
        String longUrl = urlShorterService.getLongUrl(shortUrl);
        if (longUrl != null) {
            return new ModelAndView("redirect:" + longUrl);
        } else {
            resp.sendError(HttpServletResponse.SC_NOT_FOUND);
            return null;
        }
    }

}
