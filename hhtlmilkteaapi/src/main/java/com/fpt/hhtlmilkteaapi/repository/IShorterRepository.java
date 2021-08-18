package com.fpt.hhtlmilkteaapi.repository;

import com.fpt.hhtlmilkteaapi.entity.Shorter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IShorterRepository extends JpaRepository<Shorter, Long>  {

    boolean existsByShortUrl(String shortUrl);

    boolean existsByLongUrl(String longUrl);

    Shorter findShorterMappingsByShortUrl(String shortUrl);

    Shorter findShorterMappingsByLongUrl(String longUrl);

}
