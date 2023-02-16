//package com.example.demo;
//
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import java.io.IOException;
//
//public class JwtFilter extends OncePerRequestFilter {
//    @Autowired
//    private JwtTokenValidator tokenValidator;
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
//            throws ServletException, IOException {
//        String authHeader = request.getHeader("Authorization");
//        if (authHeader != null && authHeader.startsWith("Bearer ")) {
//            String token = authHeader.substring(7);
//            if (!tokenValidator.validateToken(token)) {
//                ((HttpServletResponse) response).setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//                return;
//            }
//        }
//        filterChain.doFilter(request, response);
//    }
//}
