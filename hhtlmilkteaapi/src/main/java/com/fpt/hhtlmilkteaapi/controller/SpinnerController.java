package com.fpt.hhtlmilkteaapi.controller;

import com.fpt.hhtlmilkteaapi.entity.Spinner;
import com.fpt.hhtlmilkteaapi.payload.request.SpinnerRequest;
import com.fpt.hhtlmilkteaapi.payload.response.MessageResponse;
import com.fpt.hhtlmilkteaapi.payload.response.SpinnerResponse;
import com.fpt.hhtlmilkteaapi.repository.ISpinnerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/spinner")
public class SpinnerController {

    @Autowired
    private ISpinnerRepository spinnerRepository;

    @GetMapping("/list")
    public ResponseEntity<?> list() {
        List<Spinner> spinners = spinnerRepository.findAll();

        SpinnerResponse spinnerResponse = new SpinnerResponse();
        spinnerResponse.setSpinners(spinners);

        List<String> segments = new ArrayList<>();
        List<String> segColors = new ArrayList<>();
        for(Spinner spinner : spinners) {
            segments.add(spinner.getName());
            segColors.add(spinner.getColor());
        }

        spinnerResponse.setSegments(segments);
        spinnerResponse.setSegColors(segColors);

        return ResponseEntity.ok(spinnerResponse);
    }


    @PostMapping("/insert")
    public ResponseEntity<?> insert(@Valid @RequestBody SpinnerRequest spinnerRequest) {
        Spinner spinner = new Spinner();
        spinner.setName(spinnerRequest.getName());
        spinner.setColor(spinnerRequest.getColor());
        spinnerRepository.save(spinner);
        List<Spinner> spinners = spinnerRepository.findAll();
        return ResponseEntity.ok(spinners.get(spinners.size() - 1));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") long id) {
        Spinner spinner = spinnerRepository.findById(id).get();
        spinnerRepository.delete(spinner);
        return ResponseEntity.ok(new MessageResponse("Spinner Deleted Data Success!"));
    }
}
