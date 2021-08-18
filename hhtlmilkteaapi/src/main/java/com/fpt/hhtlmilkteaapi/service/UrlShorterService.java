package com.fpt.hhtlmilkteaapi.service;

import com.fpt.hhtlmilkteaapi.entity.Shorter;
import com.fpt.hhtlmilkteaapi.payload.response.UrlShorterResponse;
import com.fpt.hhtlmilkteaapi.repository.IShorterRepository;
import com.fpt.hhtlmilkteaapi.utility.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
public class UrlShorterService {

    private String serviceUrl;
    private HttpServletRequest httpServletRequest;

    @Value("${get.request.path}")
    String getMappingRequestPath;

    @Autowired
    private IShorterRepository shorterRepository;

    public void setServletRequest(HttpServletRequest httpServletRequest) {
        this.httpServletRequest = httpServletRequest;
        this.serviceUrl = httpServletRequest.getHeader("host") + httpServletRequest.getRequestURI().split(getMappingRequestPath)[0];
    }


    /**
     * A method to generate the short url form the given long url and returns it in the 'UrlShortenerResponse'
     *
     * @param longUrl
     * @return UrlShortenerResponse
     */
    public UrlShorterResponse generateShortUrl(String longUrl) {
        UrlShorterResponse urlShorterResponse = new UrlShorterResponse();
        String shortUrl = generateValidatedShortUrl(longUrl);
        urlShorterResponse.setShortUrl(shortUrl);
        //Saving to database before returning
        Shorter shorter = new Shorter();
        shorter.setLongUrl(longUrl);
        shorter.setShortUrl(shortUrl);
        if (!shorterRepository.existsByLongUrl(longUrl)) {
            persist(shorter);
        }
        return urlShorterResponse;
    }

    private void persist(Shorter shortener) {
        this.shorterRepository.save(shortener);
    }

    /**
     * A method to generated a validated short key and returns it in a desired url format
     * It checks for existing long urls before creating new short keys and ensures that no two different url formats have the same short url
     *
     * @param longUrl
     * @return short url
     */
    private String generateValidatedShortUrl(String longUrl) {
        if (shorterRepository.existsByLongUrl(longUrl))
            return shorterRepository.findShorterMappingsByLongUrl(longUrl).getShortUrl();
        String shortUrlKey = Utils.generateShortKey(longUrl);
        while (shorterRepository.existsByShortUrl(serviceUrl + "/" + shortUrlKey)) {
            shortUrlKey = generateValidatedShortUrl(longUrl);
        }
        return serviceUrl + "/" + shortUrlKey;
    }

    public String getLongUrl(String shortUrl) {
        boolean shortUrlExist = shorterRepository.existsByShortUrl(shortUrl);
        if (!shortUrlExist) {
            return null;
        }
        String longUrl = shorterRepository.findShorterMappingsByShortUrl(shortUrl).getLongUrl();
        return longUrl.trim();
    }

}
